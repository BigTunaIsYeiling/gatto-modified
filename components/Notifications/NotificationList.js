"use client";
import { Box, Typography } from "@mui/material";
import Notification from "./Notification";
const NotificationList = ({ data }) => {
  return (
    <Box>
      {data.length != 0 ? (
        data.map((notif, index) => (
          <Notification key={notif.id} notification={notif} />
        ))
      ) : (
        <Typography variant="h6">No Notifications For Now</Typography>
      )}
    </Box>
  );
};

export default NotificationList;
