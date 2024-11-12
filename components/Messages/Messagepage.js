"use client";
import { Box, Typography, Container } from "@mui/material";
import MessageList from "./MessagesList";
const MessagesPage = ({ data }) => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography
          sx={{
            mb: 2,
            color: "#333",
            fontWeight: "500",
            typography: {
              xs: "h5",
              sm: "h4",
            },
          }}
        >
          Inbox
        </Typography>
        <MessageList data={data} />
      </Box>
    </Container>
  );
};

export default MessagesPage;
