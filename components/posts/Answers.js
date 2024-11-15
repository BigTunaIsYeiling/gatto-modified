"use client";
import { Box, Typography } from "@mui/material";
import { Answer } from "./Answer";
import { useState, useEffect } from "react";
export default function Answers({
  userid,
  RouteUserdata,
  PostsData,
  SignedUser,
}) {
  const [posts, setposts] = useState(PostsData.PostsData);
  useEffect(() => {
    setposts(PostsData.PostsData);
  }, [PostsData]);
  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 600, textAlign: "left" }}>
        <Typography
          sx={{
            mt: 4,
            mb: 2,
            typography: "h6",
            "&.MuiTypography-root": {
              fontWeight: "400",
            },
          }}
        >
          Answers {PostsData.AllAnswers}
        </Typography>
      </Box>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        {Array.isArray(PostsData.PostsData) &&
        PostsData.PostsData.length > 0 ? (
          posts.map((post) => (
            <Answer
              key={post.postId}
              post={post}
              userid={SignedUser ? SignedUser.id : null}
              useridPosts={userid}
              avatar={RouteUserdata.avatar}
              username={RouteUserdata.username}
              setposts={setposts}
            />
          ))
        ) : (
          <Typography
            variant="body1"
            sx={{ mt: 4, color: "#666" }}
            textAlign="center"
          >
            No answers available.
          </Typography>
        )}
      </Box>
    </>
  );
}
