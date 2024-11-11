import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
export default function ListItemUser({ user }) {
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        cursor: "pointer",
        mb: 1,
        p: 1,
      }}
      component={Link}
      href={`/${user.id}`}
      prefetch={true}
      scroll={false}
    >
      <ListItemAvatar>
        <Avatar
          alt={user.username}
          src={user.avatar}
          sx={{ width: 40, height: 40 }}
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography
            variant="h6"
            sx={{
              fontWeight: 500,
              fontSize: "17px",
              color: "text.primary",
            }}
          >
            {user.username}
          </Typography>
        }
        secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              sx={{
                fontSize: "15px",
                display: "inline",
                color: "black",
                fontWeight: 500,
              }}
            >
              {user.answers} answer{user.answers !== 1 && "s"}
            </Typography>
            {" — "}
            <Typography
              component="span"
              variant="body2"
              sx={{ fontSize: "15px", color: "text.secondary" }}
            >
              {user.bio.slice(0, 55)}
              {user.bio.length > 55 && ".."}
            </Typography>
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
