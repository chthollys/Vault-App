"use client";

import { API_URL } from "@/lib/env";
import type { ChildrenProp } from "@/lib/types/props";
import { Button } from "@mui/material";
import { FaGithub } from "react-icons/fa";

export default function GithubAuthButton({ children }: ChildrenProp) {
  const handleGitHubLogin = () => {
    const baseUrl = API_URL;
    window.location.href = `${baseUrl}/auth/github`;
  };
  return (
    <Button
      variant="contained"
      startIcon={<FaGithub size={20} />}
      onClick={handleGitHubLogin}
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        width: "100%",
        px: 3,
        py: 1.2,
        fontSize: "0.95rem",
        fontWeight: 500,
        bgcolor: "#24292e",
        color: "#ffffff",
        "&:hover": {
          bgcolor: "#1b1f23",
        },
      }}
    >
      {children}
    </Button>
  );
}
