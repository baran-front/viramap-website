"use client";

import * as React from "react";
import { cn } from "@/components/lib/utils";

export type FormMessageType = "success" | "error" | "warning" | "info";

export interface FormMessageProps {
  type?: FormMessageType;
  title?: string;
  message: string;
  className?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const icons = {
  success: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M16.6667 5L7.50004 14.1667L3.33337 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M15 5L5 15M5 5L15 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  warning: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M10 6.66667V10M10 13.3333H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39765 18.3333 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  info: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <path
        d="M10 13.3333V10M10 6.66667H10.0083M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39765 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39765 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39765 18.3333 10Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const styles = {
  success: {
    container: "bg-green-500/10 border-green-500/30 text-green-400",
    icon: "text-green-500",
  },
  error: {
    container: "bg-red-500/10 border-red-500/30 text-red-400",
    icon: "text-red-500",
  },
  warning: {
    container: "bg-orange-500/10 border-orange-500/30 text-orange-400",
    icon: "text-orange-500",
  },
  info: {
    container: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    icon: "text-blue-500",
  },
};

export function FormMessage({
  type = "info",
  title,
  message,
  className,
  onClose,
  autoClose = false,
  duration = 5000,
}: FormMessageProps) {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (autoClose && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  if (!isVisible) return null;

  const style = styles[type];
  const Icon = icons[type];

  return (
    <div
      className={cn(
        "relative flex items-start gap-3 rounded-xl border p-4 font-ravi transition-all duration-300",
        style.container,
        className
      )}
      role="alert"
    >
      <div className={cn("mt-0.5", style.icon)}>{Icon}</div>
      <div className="flex-1 min-w-0">
        {title && (
          <h4 className="mb-1 text-sm font-semibold leading-tight">{title}</h4>
        )}
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={() => {
            setIsVisible(false);
            onClose();
          }}
          className={cn(
            "ml-2 flex-shrink-0 rounded-md p-1 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2",
            style.icon
          )}
          aria-label="بستن"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}


