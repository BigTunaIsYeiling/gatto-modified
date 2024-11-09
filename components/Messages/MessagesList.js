import { Box, Typography } from "@mui/material";
import Message from "./Message";

const MessageList = ({ data }) => {
  return (
    <Box>
      {data.length != 0 ? (
        data.map((msg, index) => (
          <Message
            key={msg.id}
            message={msg.content}
            date={msg.createdAt}
            id={msg.id}
            post={msg.post}
            parentPost={msg.parentPost}
          />
        ))
      ) : (
        <Typography variant="h6">No Messages For Now</Typography>
      )}
    </Box>
  );
};

export default MessageList;
