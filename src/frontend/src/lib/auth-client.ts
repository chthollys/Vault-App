import { ApiResponse } from "@repo/types";
import { clientApiFetch } from "./http/client";

export async function logout() {
  try {
    const res = await clientApiFetch<ApiResponse>("/auth/logout", {
      method: "POST",
    });
    return res.message;
  } catch (err) {
    // Handle in useMutation
    const error = err as Error;
    throw error;
  }
}
