"use client";
import { Box, Button } from "@mui/material";
import Link from "next/link";
export default function GuestNavBar() {
  return (
    <Button
      sx={{
        position: "sticky",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        mt: 2,
        backdropFilter: "blur(10px)",
        borderRadius: "50px",
        padding: 2,
        width: { xs: "96%", sm: "60%" },
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        alignSelf: "center",
        top: 16,
        zIndex: 10,
      }}
      component={Link}
      href="/register"
      prefetch={true}
    >
      <Box color={"black"} fontWeight={"500"}>
        Join As A Member
      </Box>
    </Button>
  );
}
