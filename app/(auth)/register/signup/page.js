"use client";
import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import { FaXTwitter } from "react-icons/fa6";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import styled from "@emotion/styled";
import Link from "next/link";
import { Register } from "@/lib/userActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const GlassButton = styled(Button)({
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  color: "black",
  padding: "10px 20px",
  textTransform: "none",
  fontSize: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
  },
});

const GlassInput = styled("input")({
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  display: "inline-block",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  color: "black",
  fontSize: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  outline: "none",
  "&::placeholder": {
    color: "black",
    opacity: 1,
  },
  "&:focus": {
    outline: "none",
  },
  "&:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0px 1000px rgba(255, 255, 255, 0.2) inset",
    WebkitTextFillColor: "black",
    transition: "background-color 5000s ease-in-out 0s",
  },
});

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    const res = await Register(username, password);
    if (res.success) {
      router.push("/");
    } else {
      res.errors.forEach((error) => {
        toast.error(error);
      });
    }
  };
  return (
    <Box
      sx={{
        background: "linear-gradient(180deg, #ffffff, #ffdda1)",
        minHeight: "100vh",
        overflowY: "auto",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        width={{ xs: "100%", md: "44%" }}
        sx={{ paddingX: { xs: 2, md: 4 }, paddingY: { xs: 4, md: 6 } }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={{ xs: 3, md: 4 }}
          textAlign={"center"}
        >
          Welcome to PurrGato!
        </Typography>
        <Typography variant="h6" mb={{ xs: 2, md: 4 }} textAlign="center">
          Create your account and join the community.
        </Typography>
        <Box component="form" noValidate autoComplete="off" width={"100%"}>
          <GlassInput
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <Box sx={{ position: "relative" }}>
            <GlassInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <IconButton
              onClick={togglePasswordVisibility}
              sx={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "black",
              }}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </IconButton>
          </Box>
          <GlassButton
            fullWidth
            sx={{ mt: { xs: 2, md: 3 } }}
            onClick={handleSignup}
          >
            Sign Up
          </GlassButton>
          <Typography
            variant="body2"
            mt={{ xs: 2, md: 3 }}
            mb={{ xs: 1, md: 2 }}
            sx={{ textAlign: "center" }}
          >
            or
          </Typography>
          <GlassButton
            fullWidth
            sx={{
              background: "#1DA1F2",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: 2,
            }}
            startIcon={<FaXTwitter />}
          >
            Sign Up with Twitter
          </GlassButton>
        </Box>
        <Divider sx={{ mt: 4, mb: 2, width: "100%" }} />
        <Typography variant="body2" textAlign="center" mb={2}>
          Already have an account?
        </Typography>
        <GlassButton component={Link} href="/register" fullWidth>
          Log In
        </GlassButton>
      </Stack>
    </Box>
  );
};

export default Signup;
