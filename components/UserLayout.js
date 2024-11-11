"use client";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import BackgroundTokenRefresher from "./TokenRefreshcomponent";
import GuestNavBar from "./UnloggedNavBar";

const UserLayout = ({ children, data }) => {
  const [hydratedData, setHydratedData] = useState(null);

  useEffect(() => {
    // Setting client-only data here
    setHydratedData(data);
  }, [data]);

  if (!hydratedData) return null;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {data == "guest" ? (
        <GuestNavBar />
      ) : (
        <NavBar
          avatar={data.avatar}
          isTwitter={data.isTwitter}
          username={data.username}
          id={data.id}
          messages={data.messages}
          notifications={data.notifications}
        />
      )}

      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          overflowY: "auto",
          zIndex: 1,
          marginTop: data == "guest" ? "-80px" : "-100px",
          paddingTop: data == "guest" ? "80px" : "100px",
        }}
      >
        <BackgroundTokenRefresher />
        {children}
      </Box>
    </Box>
  );
};

export default UserLayout;
