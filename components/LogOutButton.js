"use client";
import { logoutAction } from "@/lib/userActions";
import { Button } from "@mui/material";
export default function LogOutButton() {
  const handleLogout = async () => {
    await logoutAction();
  };
  return <Button onClick={handleLogout}>Log out</Button>;
}
