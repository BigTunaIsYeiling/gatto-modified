"use client";
import { Box, Typography, Paper, Avatar, Divider, Button } from "@mui/material";
import { IoMdHeart } from "react-icons/io";
import { RiQuestionAnswerFill } from "react-icons/ri";
import styled from "@emotion/styled";
import { format, formatDistanceToNow } from "date-fns";
import ConfirmDialog from "./DeleteNotification";
import Link from "next/link";
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

const Notification = ({ notification }) => {
  const createdAt = new Date(notification.createdAt);

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
        p: 3,
        borderRadius: "16px",
        backgroundColor: "#fffcf2",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
        cursor: "pointer",
      }}
      component={Link}
      prefetch={true}
      scroll={false}
      href={notification.notLink}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 2,
          position: "relative",
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <Avatar
            src={notification.fromUser.avatar} // Placeholder for anon photo
            alt="Anonymous"
            sx={{ width: 60, height: 60, mr: 2 }} // Adjust avatar size
          />
          {notification.type === "like" && (
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 5,
                background: "white",
                borderRadius: "50%",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IoMdHeart size={16} color="red" />
            </Box>
          )}
          {notification.type === "reply" && (
            <Box
              sx={{
                position: "absolute",
                bottom: 2,
                right: 5,
                background: "white",
                borderRadius: "50%",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RiQuestionAnswerFill size={16} color="#ffba6d" />
            </Box>
          )}
        </Box>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#333" }}>
            {notification.content}
            {notification.type === "reply" &&
              `${notification.fromUser.username} replied to your message '${notification.message.title}'`}
            {notification.type === "like" &&
              `${notification.fromUser.username} Liked your post '${notification.post.title}'`}
          </Typography>
          <Typography variant="caption" sx={{ color: "#666" }}>
            {formatDate()}
          </Typography>
        </Box>
      </Box>
      {/* <Divider sx={{ mb: 1 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <GlassButton
          sx={{ textDecoration: "none" }}
          component={Link}
          prefetch={true}
          scroll={false}
          href={notification.notLink}
        >
          View
        </GlassButton>
        <ConfirmDialog id={notification.id} />
      </Box> */}
    </Paper>
  );
};

export default Notification;
