"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  TextField,
  styled,
  Button,
  IconButton,
  CircularProgress,
  Dialog,
} from "@mui/material";
import toast from "react-hot-toast";
import { SendMessage } from "@/lib/MessagesActions";
import { LiaUserEditSolid } from "react-icons/lia";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
const GlassButton = styled(Button)({
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "25px",
  color: "black",
  padding: "15px",
  textTransform: "none",
  fontSize: "14px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
  marginTop: "10px",
  marginBottom: "10px",
});

const UserProfile = ({ children, data, userid, userdata }) => {
  const [message, setMessage] = useState("");
  const [direction, setDirection] = useState("ltr");
  const [loading, setLoading] = useState(false);
  const SendMessageRequest = async () => {
    setLoading(true);
    const res = await SendMessage({
      body: {
        content: message,
        senderId: !userdata ? null : userdata.id,
        receiverId: userid,
      },
    });
    setLoading(false);
    if (res.success) {
      toast.success("Message sent successfully");
      setMessage("");
    } else {
      toast.error(res.error);
    }
  };
  const handleTextChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    // Set direction based on input language
    if (/[\u0600-\u06FF]/.test(value.trim().charAt(0))) {
      // Arabic Unicode range
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        mt: 4,
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          width: { xs: "100%", sm: 600 },
          p: 1,
        }}
      >
        {userdata.id == userid && (
          <IconButton
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 1,
              backgroundColor: "white",
            }}
            component={Link}
            href="/settings"
            prefetch={true}
            scroll={false}
          >
            <LiaUserEditSolid />
          </IconButton>
        )}
        <Box
          p={1}
          sx={{
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
          borderRadius={"50%"}
        >
          <Avatar
            src={data.avatar}
            alt={data.username}
            sx={{ width: 70, height: 70, cursor: "pointer" }}
            onClick={handleOpen}
          />
          <Dialog fullScreen open={open} onClose={handleClose}>
            <IconButton
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
              }}
            >
              <AiOutlineClose />
            </IconButton>
            <img
              src={data.avatar}
              alt="Full Screen"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                backgroundColor: "black",
              }}
            />
          </Dialog>
        </Box>
        <Typography sx={{ mt: 2, fontSize: "28px", fontWeight: 500 }}>
          {data.id ? data.username : "Not Exists"}
        </Typography>
        <Typography
          variant="body1"
          sx={{ my: 1, fontWeight: "400", color: "#777", textAlign: "center" }}
        >
          {data.bio}
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <TextField
            placeholder="Send Anonymous Message"
            multiline
            rows={4}
            value={message}
            onChange={handleTextChange}
            variant="outlined"
            slotProps={{
              inputLabel: {
                shrink: false,
              },
            }}
            sx={{
              whiteSpace: "pre-wrap",
              mt: 3,
              width: "100%",
              borderRadius: "25px",
              backgroundColor: "#FFFFFF",
              padding: "10px 15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              overflow: "hidden",
              border: "1px solid rgba(255, 255, 255, 0.3)", // Glass effect border
              backdropFilter: "blur(10px)", // Frosted glass effect
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none", // Remove default border
                },
                "&.Mui-focused fieldset": {
                  border: "none", // Remove default border on focus
                },
                "&:hover fieldset": {
                  border: "none", // Remove default border on hover
                },
              },
              "& .MuiInputBase-inputMultiline": {
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar
                },
              },
              direction: direction,
            }}
            disabled={data.id ? false : true}
          />
        </Box>
        <Box sx={{ width: "100%", maxWidth: 600 }}>
          <GlassButton
            disabled={message == "" || loading}
            onClick={SendMessageRequest}
            sx={{ width: "100%" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </GlassButton>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default UserProfile;
