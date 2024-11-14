import { Box, Typography } from "@mui/material";
import Message from "./Message";
import { useState } from "react";
const MessageList = ({ data }) => {
  const [messages, setMessages] = useState(data);
  return (
    <Box>
      {data.length != 0 ? (
        messages.map((msg, index) => (
          <Message
            key={msg.id}
            message={msg.content}
            date={msg.createdAt}
            id={msg.id}
            post={msg.post}
            parentPost={msg.parentPost}
            setMessages={setMessages}
          />
        ))
      ) : (
        <Typography
          variant="h6"
          sx={{
            "&.MuiTypography-root": {
              fontWeight: "400",
            },
          }}
        >
          No Messages For Now
        </Typography>
      )}
    </Box>
  );
};

export default MessageList;
