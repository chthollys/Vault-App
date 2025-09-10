"use client";

import Button from "@mui/material/Button";
import { FcGoogle } from "react-icons/fc";
import type { ChildrenProp } from "@/lib/types/props";

export default function GoogleLoginButton({ children }: ChildrenProp) {
  return (
    <Button
      variant="outlined"
      startIcon={<FcGoogle size={20} />}
      onClick={() => signIn("google", { callbackUrl: "/" })}
      sx={{
        textTransform: "none",
        borderRadius: "12px",
        width: "100%",
        px: 3,
        py: 1.5,
        fontSize: "0.95rem",
        fontWeight: 500,
        bgcolor: "background.paper",
        "&:hover": {
          bgcolor: "grey.100",
        },
      }}
    >
      {children}
    </Button>
  );
}
