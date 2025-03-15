// components/ClientProvider.jsx
"use client";

import { Toaster } from "react-hot-toast";

export default function ClientProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "text-sm font-medium",
      }}
    />
  );
}