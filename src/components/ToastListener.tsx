"use client";

import { useEffect, useState } from "react";

type ToastType = "success" | "error";

type ToastEvent = CustomEvent<{
  message: string;
  type: ToastType;
}>;

export default function ToastListener() {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handler = (e: Event) => {
      const event = e as ToastEvent;

      setToast(event.detail);

      // ❗ clear previous timeout if new toast comes
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setToast(null);
      }, 3000);
    };

    window.addEventListener("app-toast", handler);

    return () => {
      window.removeEventListener("app-toast", handler);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-lg text-white shadow-lg transition-all
        ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {toast.message}
    </div>
  );
}