type ToastType = "success" | "error";

export function notify(message: string, type: ToastType = "success") {
  const event = new CustomEvent("app-toast", {
    detail: { message, type },
  });

  window.dispatchEvent(event);
}