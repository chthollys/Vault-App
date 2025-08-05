"use client";

import LoadingSpinner from "@/UI/Spinner/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoadingSpinner
        variant="gradient"
        size="lg"
        color="primary"
        className="m-auto"
      />
    </div>
  );
}
