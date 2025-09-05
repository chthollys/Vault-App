"use client";

import type { ErrorCaughtProps } from "@/lib/types/props";

export default function ErrorCaught({ error, reset }: ErrorCaughtProps) {
  return (
    <div className="mx-auto flex flex-col">
      <h2 className="text-xl font-semibold tracking-wider text-red-500">
        Error Occurred: {error.name}
      </h2>
      <p className="font text-lg tracking-wider text-red-500">
        {error.message}
      </p>
    </div>
  );
}
