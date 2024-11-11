"use client";
import {
  Button,
  IconButton,
  Typography,
  Box,
  Stack,
  Divider,
  Avatar,
  TextField,
} from "@mui/material";
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

export default function EditUser({ data }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

    if (/[\u0600-\u06FF]/.test(value.trim().charAt(0))) {
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
      setRev(null);
      setAvatarFile(null);
      setUsername("");
      setBio("");
      setPassword("");
    } else {
      toast.error(result.errors[0]);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
        overflowX: "hidden",
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Box sx={{ width: "100%", maxWidth: 600, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
            justifyContent: "center",
            position: "relative",
            width: "100%",
            height: 80,
          }}
        >
          <Box
            p={1}
            sx={{
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
            borderRadius={"50%"}
          >
            <Avatar
              src={rev ? rev : data.avatar}
              alt="Upload Photo"
              sx={{ width: 80, height: 80 }}
            />
          </Box>
          <IconButton
            component="label"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
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
        <Typography
          sx={{ mt: 2, fontSize: "28px", fontWeight: 500, textAlign: "center" }}
        >
          {data.username}
        </Typography>
        <Typography
          variant="body1"
          sx={{ my: 1, fontWeight: "400", color: "#777", textAlign: "center" }}
        >
          {data.bio}
        </Typography>
        <Box sx={{ my: 2 }}>
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
                  border: "none",
                },
                direction: direction,
              },
            }}
            multiline
            rows={3}
            sx={{ width: "100%" }}
            value={NewBio}
            onChange={handleTextChange}
            name="bio"
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder="New Username"
            slotProps={{
              input: {
                sx: {
                  borderRadius: "25px",
                  backgroundColor: "white",
                  padding: "2px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  backdropFilter: "blur(10px)",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              },
            }}
            value={NewUsername}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "100%" }}
            autoComplete="username"
            name="username"
          />
        </Box>
        {!data.isTwitter && (
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
                    border: "none",
                  },
                },
              }}
              sx={{ width: "100%" }}
              value={NewPassword}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
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
          <GlassButton
            type="submit"
            sx={{ alignSelf: "flex-end" }}
            disabled={
              NewUsername == "" &&
              NewPassword == "" &&
              NewBio == "" &&
              !avatarFile
            }
          >
            Apply
          </GlassButton>
        </Stack>
      </Box>
    </Box>
  );
}
