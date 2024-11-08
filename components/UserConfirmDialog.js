import { DeleteUserAction } from "@/lib/userActions";
import styled from "@emotion/styled";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const GlassButton = styled(Button)({
  background: "rgba(255, 255, 255, 0.25)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  borderRadius: "10px",
  color: "#FF6B6B",
  padding: "5px 10px",
  textTransform: "none",
  fontSize: "14px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
});

const ConfirmDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = async () => {
    const result = await DeleteUserAction();
    if (result.success) {
      toast.success("User deleted successfully");
      router.push("/register");
    }
  };
  return (
    <React.Fragment>
      <GlassButton sx={{ mb: 2 }} onClick={handleClickOpen}>
        Delete Account
      </GlassButton>
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
              You are about to delete your account including all your posts,
              likes, and notifications.
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
              onClick={handleDelete}
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
