import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen min-w-full items-center justify-center">
      <CircularProgress
        size={60}
        color="primary"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
