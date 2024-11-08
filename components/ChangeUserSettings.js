"use client";
import {
  Button,
  Dialog,
  IconButton,
  Typography,
  Box,
  MenuItem,
  Stack,
  Divider,
  Avatar,
  TextField,
  ListItemIcon,
} from "@mui/material";
import { CiSettings } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { styled } from "@mui/system";
import { TbCameraMinus } from "react-icons/tb";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ConfirmDialog from "./UserConfirmDialog";
import { ChangeUserSettingsAction } from "@/lib/userActions";
import toast from "react-hot-toast";
const GlassButton = styled(Button)({
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  color: "black",
  padding: "5px 10px",
  textTransform: "none",
  fontSize: "14px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
});

export default function UserDialog({ isTwitter, username, avatar, id }) {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRev(null);
    setAvatarFile(null);
    setUsername("");
    setBio("");
    setPassword("");
  };
  const [rev, setRev] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [NewUsername, setUsername] = useState("");
  const [NewBio, setBio] = useState("");
  const [direction, setDirection] = useState("ltr");
  const [NewPassword, setPassword] = useState("");
  const DisplayAvatar = (file) => {
    setRev(URL.createObjectURL(file));
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      DisplayAvatar(file);
    }
  };
  const handleTextChange = (e) => {
    const value = e.target.value;
    setBio(value);

    // Set direction based on input language
    if (/[\u0600-\u06FF]/.test(value.trim().charAt(0))) {
      // Arabic Unicode range
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", NewUsername);
    formData.append("password", NewPassword);
    formData.append("bio", NewBio);
    formData.append("avatar", avatarFile);

    const result = await ChangeUserSettingsAction(formData);

    if (result.success) {
      toast.success("User settings updated successfully");
      handleClose();
    } else {
      toast.error(result.errors[0]);
    }
  };
  return (
    <>
      <MenuItem
        sx={{ display: "flex", justifyContent: "space-between" }}
        onClick={handleClickOpen}
      >
        <Stack direction={"column"}>
          <Typography variant="body2">
            {username.slice(0, 9)}
            {username.length > 9 && ".."}
          </Typography>
          <Typography color="#777" variant="body2">
            {isTwitter ? "Twitter User" : "PurrGato User"}
          </Typography>
        </Stack>
        <ListItemIcon>
          <CiSettings size={18} />
        </ListItemIcon>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: "#FFFCF2", // Gradient background
            borderRadius: { xs: "10px", sm: "10px" },
            padding: "10px",
            height: { xs: "100%", sm: "auto" }, // Full height on small screens, auto on larger
            width: { xs: "100%", sm: 500 }, // Full width on small screens, 600px on larger
            overflowX: "hidden",
          },
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            User Options
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <AiOutlineClose />
          </IconButton>
        </Box>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              justifyContent: "center",
              position: "relative", // Ensures the IconButton positions relative to this Box
              width: "100%", // Match Avatar dimensions
              height: 80,
            }}
          >
            <Avatar
              src={rev ? rev : avatar}
              alt="Upload Photo"
              sx={{ width: 80, height: 80 }}
            />
            <IconButton
              component="label"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly transparent background
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                },
              }}
            >
              <TbCameraMinus />
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleAvatarChange}
                name="avatar"
              />
            </IconButton>
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="Update bio"
              InputProps={{
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove border
                  },
                  direction: direction,
                },
              }}
              multiline
              rows={3}
              sx={{ width: "100%" }}
              value={NewBio}
              onChange={handleTextChange}
              onKeyDown={(e) => e.stopPropagation()}
              name="bio"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              variant="outlined"
              placeholder="New Username"
              InputProps={{
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "white",
                  padding: "2px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none", // Remove border
                  },
                },
              }}
              value={NewUsername}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ width: "100%" }}
              autoComplete="username"
              onKeyDown={(e) => e.stopPropagation()}
              name="username"
            />
          </Box>
          {!isTwitter && (
            <Box sx={{ position: "relative" }} mb={2}>
              <TextField
                variant="outlined"
                placeholder="New Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  sx: {
                    borderRadius: "25px",
                    backgroundColor: "white",
                    padding: "2px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    backdropFilter: "blur(10px)",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none", // Remove border
                    },
                  },
                }}
                sx={{ width: "100%" }}
                value={NewPassword}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                onKeyDown={(e) => e.stopPropagation()}
                name="password"
              />
              <IconButton
                onClick={togglePasswordVisibility}
                sx={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "black",
                }}
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </IconButton>
            </Box>
          )}
          <Divider sx={{ my: 3 }} />
          <Stack direction={"column"} alignItems={"flex-start"}>
            <GlassButton sx={{ mb: 2 }} disabled>
              Download Your Twitter Api
            </GlassButton>
            <ConfirmDialog />
          </Stack>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <GlassButton
            type="submit"
            disabled={
              NewUsername == "" &&
              NewPassword == "" &&
              NewBio == "" &&
              !avatarFile
            }
          >
            Apply
          </GlassButton>
        </Box>
      </Dialog>
    </>
  );
}
