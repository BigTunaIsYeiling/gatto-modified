"use client";
import { Box } from "@mui/material";
import NavBar from "./NavBar";

const UserLayout = ({ children, data }) => {
  if (!data) return <div>Loading...</div>; // Loading state for smoother SSR

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <NavBar
        avatar={data.avatar}
        isTwitter={data.isTwitter}
        username={data.username}
        id={data.id}
        messages={data.messages}
        notifications={data.notifications}
      />
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          overflowY: "auto",
          zIndex: 1,
          marginTop: "-100px",
          paddingTop: "100px",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default UserLayout;
