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
import ReAsk from "./ReAsk";
import ConfirmDialog from "./DeleteSub";
import { LikeSubPostAction } from "@/lib/SubPostsActions";
import { RiTwitterXLine } from "react-icons/ri";
export const SubAnswer = ({
  post,
  avatar,
  username,
  userid,
  useridPosts,
  isSubAnswer,
  postParam,
  setposts,
}) => {
  const [isLiked, setIsLiked] = useState(post.likes.includes(userid));
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [anchorEl, setAnchorEl] = useState(null);
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
    const res = await LikeSubPostAction({
      postId: post.postId,
      useridPosts,
      postParam,
    });
    if (!res.success) {
      setIsLiked(isLiked);
      setLikesCount(isLiked ? likesCount : likesCount - 1);
    }
  };
  const handleShareClick = () => {
    const url = `https://purrgato.vercel.app/${useridPosts}/post/${post.postId}`;
    const text = `${post.ask} - ${post.answer}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(twitterShareUrl, "_blank");
  };
  return (
    <Box
      sx={{
        mb: 3,
        p: 3,
        borderRadius: "20px",
        background: isSubAnswer ? "#fffaf0" : "#fffcf2",
        border: isSubAnswer
          ? "1px solid #fdecd2"
          : "1px solid rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        position: "relative",
        ml: isSubAnswer ? 4 : 0,
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
          textAlign: /^[\u0600-\u06FF]/.test(post.ask.trim()) ? "end" : "start",
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
          fontSize: isSubAnswer ? "0.9rem" : "1rem",
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
        {useridPosts == userid && (
          <>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                color: "#6A6A6A",
              }}
            >
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
                  p: 0.6,
                  width: 160,
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
              <ConfirmDialog
                postParam={postParam}
                postId={post.postId}
                RouteuserId={useridPosts}
                setposts={setposts}
              />
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};
