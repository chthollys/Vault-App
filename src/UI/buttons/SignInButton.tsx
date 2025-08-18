import { Button, ButtonProps } from "@mui/material";
import { SignInIcon } from "../icons";
import { LoadingSpinner } from "../Spinner";

export default function SignInButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      variant="contained"
      className="bg-primary! hover:bg-primary-dark! rounded-md py-3 text-[0.95rem] font-semibold normal-case"
      size="large"
      startIcon={<SignInIcon />}
      loadingIndicator={
        <LoadingSpinner color="white" variant="simple" size="sm" />
      }
      {...props}
    >
      {children}
    </Button>
  );
}
