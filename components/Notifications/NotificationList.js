"use client";
import { Box, Typography } from "@mui/material";
import Notification from "./Notification";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { useState } from "react";

const NotificationList = ({ data }) => {
  const [notifications, setNotifications] = useState(data);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setNotifications((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <SortableContext
        items={notifications}
        strategy={verticalListSortingStrategy}
      >
        <Box sx={{ touchAction: "none" }}>
          {notifications.length !== 0 ? (
            notifications.map((notif) => (
              <Notification key={notif.id} notification={notif} />
            ))
          ) : (
            <Typography variant="h6">No Notifications For Now</Typography>
          )}
        </Box>
      </SortableContext>
    </DndContext>
  );
};

export default NotificationList;
