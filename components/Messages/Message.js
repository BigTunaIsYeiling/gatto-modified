"use client";
import { Box, Typography, Paper, Avatar, Divider, Stack } from "@mui/material";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import ReplyComponent from "./ReplyComponent";
import ReplyOnPost from "./ReplyonPost";
import ConfirmDialog from "./DeleteMessage";
const Message = ({ message, date, id, post, parentPost }) => {
  const createdAt = new Date(date);

  const formatDate = () => {
    const now = new Date();
    const differenceInHours = (now - createdAt) / 1000 / 60 / 60;

    if (differenceInHours < 24) {
      return formatDistanceToNow(createdAt, { addSuffix: true });
    } else {
      return format(createdAt, "MM/dd/yyyy");
    }
  };
  return (
    <Paper
      sx={{
        mb: 2,
        p: { xs: 2, sm: 3 },
        borderRadius: "16px",
        backgroundColor: "#fffcf2", // Frosted glass effect
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Avatar
          sx={{ width: 40, height: 40, mr: 2 }}
          src={
            "https://res.cloudinary.com/drsodrtuf/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1731308045/Gattoavatars/anon_b2dtdb.jpg"
          }
          alt="Anonymous"
        />
        <Stack direction={"column"}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
            Anonymous
          </Typography>
          <Typography variant="caption" sx={{ color: "#666" }}>
            {formatDate()}
          </Typography>
          {post && (
            <Typography variant="caption" sx={{ color: "#666" }}>
              {"Related to "}
              <Box component={"span"} sx={{ fontWeight: 600 }}>
                {post.slice(0, 50)}
                {post.length > 50 ? "..." : ""}
              </Box>
            </Typography>
          )}
        </Stack>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: "#333",
          fontWeight: "500",
          mb: 1.5,
          whiteSpace: "pre-wrap",
          textAlign: /^[\u0600-\u06FF]/.test(message.trim()) ? "end" : "start",
          direction: /^[\u0600-\u06FF]/.test(message.trim()) ? "rtl" : "ltr",
        }}
      >
        {message}
      </Typography>

      <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {!post ? (
          <ReplyComponent content={message} id={id} />
        ) : (
          <ReplyOnPost content={message} id={id} parentpost={parentPost} />
        )}
        <ConfirmDialog messageId={id} />
      </Box>
    </Paper>
  );
};

export default Message;
