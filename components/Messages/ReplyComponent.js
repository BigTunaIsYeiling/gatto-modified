import React, { useState } from "react";
import styled from "@emotion/styled";
import {
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Divider,
  CircularProgress,
} from "@mui/material";
import { AiOutlineClose } from "react-icons/ai";
import toast from "react-hot-toast";
import { AddPost } from "@/lib/postsActions";
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
  display: "flex",
  alignItems: "center",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
});

export default function ReplyComponent({ content, id, setMessages }) {
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [direction, setDirection] = useState("ltr");
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleReply = async () => {
    setLoading(true);
    const body = {
      PostBody: replyText,
      messageId: id,
    };
    const res = await AddPost(body);
    setLoading(false);
    if (res.success) {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      toast.success("Post added successfully");
      setReplyText("");
      return handleClose();
    } else {
      return toast.error(res.error);
    }
  };
  const handleTextChange = (e) => {
    const value = e.target.value;
    setReplyText(value);

    // Set direction based on input language
    if (/[\u0600-\u06FF]/.test(value.trim().charAt(0))) {
      // Arabic Unicode range
      setDirection("rtl");
    } else {
      setDirection("ltr");
    }
  };
  return (
    <>
      <GlassButton onClick={handleOpen}>Reply</GlassButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={isSmallScreen}
        PaperProps={{
          sx: {
            background: "#FFFCF2", // Gradient background
            borderRadius: { xs: "0px", sm: "10px" },
            padding: "10px",
            height: { xs: "100%", sm: "auto" }, // Full height on small screens, auto on larger
            width: { xs: "100%", sm: 500 }, // Full width on small screens, 600px on larger
            overflowX: "hidden",
            "&::-webkit-scrollbar": { width: "15px" },
            "&::-webkit-scrollbar-track": { backgroundColor: "white" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#FCE3CD",
            },
            "&::-webkit-scrollbar-button": {
              backgroundColor: "#FCE3CD" /* Background of the buttons */,
              width: "15px",
              height: "10px",
            },
            "&::-webkit-scrollbar-button:single-button:decrement": {
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 8l8 8H4z"/></svg>\')',
              backgroundSize: "15px 10px" /* Adjust size to fit the button */,
            },
            "&::-webkit-scrollbar-button:single-button:increment": {
              backgroundImage:
                'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 16l-8-8h16z"/></svg>\')',
              backgroundSize: "15px 10px" /* Adjust size to fit the button */,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Send Reply
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
          <Typography
            variant="body1"
            sx={{
              color: "#333",
              fontWeight: "500",
              mb: 1.5,
              whiteSpace: "pre-wrap",
              textAlign: /^[\u0600-\u06FF]/.test(content.trim())
                ? "end"
                : "start",
              direction: /^[\u0600-\u06FF]/.test(content.trim())
                ? "rtl"
                : "ltr",
            }}
          >
            {content}
          </Typography>
          <Divider sx={{ mt: 3 }} />
          <Box sx={{ width: "100%", maxWidth: 600 }}>
            <TextField
              placeholder="Reply To Anonymous Message"
              multiline
              rows={6}
              value={replyText}
              onChange={handleTextChange}
              variant="outlined"
              slotProps={{
                inputLabel: {
                  shrink: false,
                },
              }}
              sx={{
                whiteSpace: "pre-wrap",
                mt: 1,
                width: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
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
                  padding: 0,
                },
                "& .MuiInputBase-inputMultiline": {
                  "&::-webkit-scrollbar": {
                    display: "none", // Hide scrollbar
                  },
                },
                direction: direction,
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
          <GlassButton onClick={handleReply} disabled={loading}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send"}
          </GlassButton>
        </Box>
      </Dialog>
    </>
  );
}
