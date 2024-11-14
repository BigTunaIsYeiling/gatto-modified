"use client";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Avatar,
  ListItemIcon,
  Badge,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { VscAccount, VscBell, VscHome, VscMail } from "react-icons/vsc";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/app/logo.png";
import { IoIosLogOut } from "react-icons/io";
import { logoutAction } from "@/lib/userActions";
import { RiTwitterXLine } from "react-icons/ri";
export default function NavBar({ avatar, id, messages, notifications }) {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const res = await logoutAction();
    if (res.success) {
      router.push("/register");
    }
  };
  const handleShareClick = () => {
    const url = `https://purrgato.vercel.app/${id}`;
    const text = "Ask me Gatto";
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(twitterShareUrl, "_blank");
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              p: 1,
              width: 200,
            },
          },
        }}
      >
        <MenuItem
          sx={{ display: "flex", justifyContent: "space-between" }}
          onClick={handleShareClick}
        >
          <Typography variant="body2">Share</Typography>
          <ListItemIcon>
            <RiTwitterXLine size={18} />
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="body2" color="#d32f2f">
            Sign out
          </Typography>
          <ListItemIcon>
            <IoIosLogOut size={18} color="#d32f2f" />
          </ListItemIcon>
        </MenuItem>
      </Menu>
      <AppBar
        position="sticky"
        sx={{
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
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            <Image src={Logo} alt="PurrGatto Logo" width={40} height={40} />
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 3,
            }}
          >
            <Link href="/" prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color: pathname === "/" ? "rgb(247,152,18)" : "#777",
                  transition: "color 0.3s",
                }}
              >
                <VscHome size={24} />
              </IconButton>
            </Link>
            <Link href={`/${id}`} prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color: pathname != `/${id}` ? "#777" : "rgb(247,152,18)",
                  transition: "color 0.3s",
                }}
              >
                <VscAccount size={24} />
              </IconButton>
            </Link>
            <Link href="/messages" prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color: pathname === "/messages" ? "rgb(247,152,18)" : "#777",
                  transition: "color 0.3s",
                }}
              >
                <Badge
                  badgeContent={messages}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "rgb(247,152,18)",
                      color: "white",
                    },
                  }}
                >
                  <VscMail size={24} />
                </Badge>
              </IconButton>
            </Link>
            <Link href="/notifications" prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color:
                    pathname === "/notifications" ? "rgb(247,152,18)" : "#777",
                  transition: "color 0.3s",
                }}
              >
                <Badge
                  badgeContent={notifications}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "rgb(247,152,18)",
                      color: "white",
                    },
                  }}
                >
                  <VscBell size={24} />
                </Badge>
              </IconButton>
            </Link>
          </Box>
          <IconButton
            onClick={handleMenuClick}
            sx={{
              color: "#777",
              transition: "color 0.3s",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              "&:hover": {
                color: "#FCE3CD",
              },
              display: { xs: "none", sm: "inline-flex " },
              padding: { xs: 0.5, sm: 0.8 },
            }}
          >
            <Avatar
              alt="User Avatar"
              src={avatar}
              sx={{
                width: 32,
                height: 32,
              }}
            />
          </IconButton>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
              alignItems: "center",
              gap: 3,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Link href="/" prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color: pathname === "/" ? "rgb(247,152,18)" : "#777",
                  transition: "color 0.3s",
                }}
              >
                <VscHome size={24} />
              </IconButton>
            </Link>
            <Link href={`/${id}`} prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color: pathname != `/${id}` ? "#777" : "rgb(247,152,18)",
                  transition: "color 0.3s",
                }}
              >
                <VscAccount size={24} />
              </IconButton>
            </Link>
            <Link href="/messages" prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color: pathname === "/messages" ? "rgb(247,152,18)" : "#777",
                  transition: "color 0.3s",
                }}
              >
                <Badge
                  badgeContent={messages}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "rgb(247,152,18)",
                      color: "white",
                    },
                  }}
                >
                  <VscMail size={24} />
                </Badge>
              </IconButton>
            </Link>
            <Link href="/notifications" prefetch={true} scroll={false}>
              <IconButton
                sx={{
                  color:
                    pathname === "/notifications" ? "rgb(247,152,18)" : "#777",
                  transition: "color 0.3s",
                }}
              >
                <Badge
                  badgeContent={notifications}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "rgb(247,152,18)",
                      color: "white",
                    },
                  }}
                >
                  <VscBell size={24} />
                </Badge>
              </IconButton>
            </Link>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: "#777",
                transition: "color 0.3s",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                "&:hover": {
                  color: "#FCE3CD",
                },
                padding: { xs: 0.6, sm: 0.8 },
              }}
            >
              <Avatar
                alt="User Avatar"
                src={avatar}
                sx={{
                  width: 32,
                  height: 32,
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
