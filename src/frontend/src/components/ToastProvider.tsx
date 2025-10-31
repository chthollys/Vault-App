"use client";

import { ToastContainer } from "react-toastify";

export default function ToastProvider() {
  return (
    <ToastContainer
      rtl={false}
      position="top-right"
      newestOnTop
      closeOnClick
      pauseOnFocusLoss
      autoClose={3000}
      theme="dark"
      hideProgressBar={true}
      closeButton={false}
    />
  );
}
