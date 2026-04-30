import { useEffect } from "react";
import Button from "./Button.jsx";

export default function Modal({
  isOpen,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
  onClose
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose?.();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-gray-900/40 px-4 py-6 sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-md rounded-lg bg-white p-5 shadow-soft"
      >
        <div className="space-y-2">
          <h2 id="modal-title" className="text-lg font-bold text-gray-900">
            {title}
          </h2>
          {description ? <p className="text-sm leading-6 text-gray-600">{description}</p> : null}
        </div>

        {children ? <div className="mt-4">{children}</div> : null}

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {secondaryAction ? (
            <Button variant="secondary" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          ) : null}
          {primaryAction ? (
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
