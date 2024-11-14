"use client";
import styled from "@emotion/styled";
import { Box, Button, Divider, Typography } from "@mui/material";
import { SubAnswer } from "./SubAnswer";
import Link from "next/link";
const GlassButton = styled(Button)({
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "25px",
  color: "black",
  padding: "15px",
  textTransform: "none",
  fontSize: "14px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
  marginTop: "10px",
  marginBottom: "10px",
});

export default function PostOnePosts({
  userid,
  postid,
  data,
  posts,
  userData,
}) {
  return (
    <Box my={2} sx={{ width: "100%", maxWidth: 600 }}>
      <Divider />
      <Box sx={{ width: "100%", maxWidth: 600 }} my={1}>
        {data.id && (
          <GlassButton
            sx={{ width: "100%" }}
            component={Link}
            href={`/${userid}`}
            prefetch={true}
            scroll={false}
          >
            View {data.username + "'s"} All Answers
          </GlassButton>
        )}
      </Box>
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <SubAnswer
              key={post.postId}
              post={post}
              avatar={data.avatar}
              username={data.username}
              userid={userData ? userData.id : null}
              useridPosts={userid}
              isSubAnswer={post.isSubAnswer}
              postParam={postid}
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
    </Box>
  );
}
