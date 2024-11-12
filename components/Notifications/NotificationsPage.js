"use client";
import NotificationList from "@/components/Notifications/NotificationList";
import SetReadNot from "@/lib/SetReadNot";
import { Box, Typography, Container } from "@mui/material";
import { useEffect } from "react";
const NotificationsPage = ({ data }) => {
  useEffect(() => {
    const updateReads = async () => {
      await SetReadNot();
    };
    updateReads();
  }, []);
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            mb: 2,
            color: "#333",
            fontWeight: 600,
            typography: {
              xs: "h5",
              sm: "h4",
            },
          }}
        >
          Notifications
        </Typography>
        <NotificationList data={data} />
      </Box>
    </Container>
  );
};

export default NotificationsPage;
