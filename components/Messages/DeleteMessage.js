import { DeleteMessageAction } from "@/lib/MessagesActions";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
const ConfirmDialog = ({ messageId, setMessages }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const DeleteMessage = async () => {
    const res = await DeleteMessageAction(messageId);
    if (res.success) {
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      toast.success("Message deleted successfully");
      onClose();
    }
  };
  return (
    <React.Fragment>
      <IconButton sx={{ color: "#555" }} onClick={handleClickOpen}>
        <AiOutlineDelete size={20} />
      </IconButton>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            backgroundColor: "#f8f4f0", // Background color matching your theme
            boxShadow: "none",
            borderRadius: "16px",
            maxWidth: "400px",
            margin: "auto",
          },
        }}
      >
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          {/* Custom Title */}
          <DialogTitle sx={{ padding: 0, marginBottom: "8px" }}>
            <Typography
              component="div"
              variant="h6"
              fontWeight="bold"
              color="#333"
            >
              Confirm Deletion
            </Typography>
          </DialogTitle>

          {/* Custom Message */}
          <DialogContent sx={{ padding: 0, marginBottom: "20px" }}>
            <Typography variant="body1" color="#666">
              Are you sure you want to delete this message?
            </Typography>
          </DialogContent>
          {/* Custom Actions */}
          <DialogActions sx={{ justifyContent: "center", padding: 0 }}>
            <Button
              onClick={onClose}
              sx={{
                backgroundColor: "#fdecd2",
                color: "#333",
                borderRadius: "12px",
                padding: "8px 20px",
                fontWeight: "bold",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#fddbb2",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#fdab42",
                color: "#fff",
                borderRadius: "12px",
                padding: "8px 20px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#fd9b22",
                },
              }}
              onClick={DeleteMessage}
            >
              Confirm
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </React.Fragment>
  );
};

export default ConfirmDialog;
