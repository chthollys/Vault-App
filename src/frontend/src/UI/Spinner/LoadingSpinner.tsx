"use client";

import { Spinner, SpinnerProps } from "@heroui/react";

export interface LoadingSpinnerProps {
  label: string;
}

export default function LoadingSpinner({ ...props }: SpinnerProps) {
  return <Spinner {...props} />;
}
