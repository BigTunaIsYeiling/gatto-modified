"use client";
import { Box, Typography, Container } from "@mui/material";
import MessageList from "./MessagesList";
const MessagesPage = ({ data }) => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 2, color: "#333", fontWeight: 600 }}>
          Inbox
        </Typography>
        <MessageList data={data} />
      </Box>
    </Container>
  );
};

export default MessagesPage;
