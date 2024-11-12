"use client";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { useState } from "react";
import { IoShareOutline } from "react-icons/io5";
import { AiOutlineNodeExpand } from "react-icons/ai";
import { useRouter } from "next/navigation";
import ConfirmDialog from "./DeletePost";
import ReAsk from "./ReAsk";
import { LikePostAction } from "@/lib/postsActions";
import Link from "next/link";
export const Answer = ({ post, avatar, username, userid, useridPosts }) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  // Local states to handle like status and count
  const [isLiked, setIsLiked] = useState(post.likes.includes(userid));
  const [likesCount, setLikesCount] = useState(post.likes.length);

  // Open delete menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close delete menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const createdAt = new Date(post.createdAt);
  const formatDate = () => {
    const now = new Date();
    const differenceInHours = (now - createdAt) / 1000 / 60 / 60;

    if (differenceInHours < 24) {
      return formatDistanceToNow(createdAt, { addSuffix: true });
    } else {
      return format(createdAt, "MM/dd/yyyy");
    }
  };

  const LikePost = async () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    const res = await LikePostAction({ postId: post.postId, useridPosts });
    if (!res.success) {
      setIsLiked(isLiked);
      setLikesCount(isLiked ? likesCount : likesCount - 1);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          mb: 3,
          p: { xs: 2, sm: 3 },
          borderRadius: "20px",
          background: "#fffcf2",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        {/* The Ask */}
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            color: "black",
            whiteSpace: "pre-wrap",
            "&.MuiTypography-h6": {
              lineHeight: 1,
            },
            textAlign: /^[\u0600-\u06FF]/.test(post.ask.trim())
              ? "end"
              : "start",
            direction: /^[\u0600-\u06FF]/.test(post.ask.trim()) ? "rtl" : "ltr",
          }}
        >
          {post.ask}
        </Typography>

        {/* Avatar and User Info */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Avatar
            src={avatar}
            alt={username}
            sx={{ width: 40, height: 40, border: "2px solid #fdecd2" }}
          />
          <Box sx={{ ml: 2 }}>
            <Typography
              variant="body2"
              sx={{ color: "#6A6A6A", fontWeight: 500 }}
            >
              {username}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ fontWeight: 500 }}
            >
              {formatDate()}
            </Typography>
          </Box>
        </Box>

        {/* The Answer */}
        <Typography
          variant="body1"
          sx={{
            my: 2,
            color: "black",
            whiteSpace: "pre-wrap",
            textAlign: /^[\u0600-\u06FF]/.test(post.answer.trim())
              ? "end"
              : "start",
            direction: /^[\u0600-\u06FF]/.test(post.answer.trim())
              ? "rtl"
              : "ltr",
          }}
        >
          {post.answer}
        </Typography>

        <Divider sx={{ mt: 2, mb: 2 }} />

        {/* Icons for Heart React and Reply */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mt: 2,
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {/* Heart Icon Toggle */}
            <IconButton
              aria-label="like"
              sx={{ color: isLiked ? "red" : "#6A6A6A" }}
              onClick={LikePost}
              disabled={userid == null}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              <Typography variant="body2" color="black" sx={{ ml: 1 }}>
                {likesCount}
              </Typography>
            </IconButton>
            <ReAsk
              messagehead={post.answer}
              senderid={userid}
              receiverid={useridPosts}
              postId={post.postId}
            />
          </Stack>

          <IconButton onClick={handleMenuClick} sx={{ color: "#6A6A6A" }}>
            <PiDotsThreeOutlineLight />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: "rgba(255, 255, 255, 0.25)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                border: "1px solid rgba(255, 255, 255, 0.18)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                p: 1,
                width: 170,
              },
            }}
          >
            <MenuItem
              sx={{ display: "flex", justifyContent: "space-between" }}
              disabled={post.isParentPost}
              component={Link}
              href={`/${useridPosts}/post/${post.postId}`}
              prefetch={true}
              scroll={false}
            >
              <Typography variant="body2">Thread</Typography>
              <ListItemIcon>
                <AiOutlineNodeExpand size={18} />
              </ListItemIcon>
            </MenuItem>
            {useridPosts == userid && (
              <MenuItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography variant="body2">Share</Typography>
                <ListItemIcon>
                  <IoShareOutline size={18} />
                </ListItemIcon>
              </MenuItem>
            )}
            {useridPosts == userid && <Divider />}
            {useridPosts == userid && (
              <ConfirmDialog useridPosts={useridPosts} postId={post.postId} />
            )}
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};
