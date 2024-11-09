"use client";
import NotificationList from "@/components/Notifications/NotificationList";
import { Box, Typography, Container } from "@mui/material";
const NotificationsPage = ({ data }) => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#333", fontWeight: 600 }}>
          Notifications
        </Typography>
        <NotificationList data={data} />
      </Box>
    </Container>
  );
};

export default NotificationsPage;
