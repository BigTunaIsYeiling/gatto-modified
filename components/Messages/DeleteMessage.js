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
import { AiOutlineDelete } from "react-icons/ai";
const ConfirmDialog = ({ messageId }) => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const DeleteMessage = async () => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ messageId }),
    //   credentials: "include",
    // });
    // const data = await res.json();
    // if (res.ok) {
    //   mutate(`${process.env.NEXT_PUBLIC_API_URL}/message`);
    //   return mutate(`${process.env.NEXT_PUBLIC_API_URL}/user/`);
    // }
    // return data;
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
