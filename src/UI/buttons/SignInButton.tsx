import { Button, ButtonProps } from "@mui/material";
import { SignInIcon } from "../icons";
import { LoadingSpinner } from "../Spinner";

interface SignInButtonProps extends ButtonProps {
  showIcon?: boolean;
}

export default function SignInButton({
  showIcon = true,
  children,
  ...props
}: SignInButtonProps) {
  return (
    <Button
      variant="contained"
      className="bg-primary! hover:bg-primary-dark! rounded-md py-3 text-[0.95rem] font-semibold normal-case"
      size="large"
      startIcon={showIcon ? <SignInIcon /> : null}
      loadingIndicator={
        <LoadingSpinner color="white" variant="simple" size="sm" />
      }
      {...props}
    >
      {children}
    </Button>
  );
}
