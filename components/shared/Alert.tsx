import type { ReactNode } from "react";
import { ExclamationCircleIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

interface Props {
  message: string;
  alertVariant: "success" | "warning" | "error";
}

const variantStyles: Record<Props["alertVariant"], { border: string; text: string; gradient: string }> = {
  success: { border: "border-success", text: "text-success", gradient: "from-success" },
  warning: { border: "border-warning", text: "text-warning", gradient: "from-warning" },
  error: { border: "border-error", text: "text-error", gradient: "from-error" }
};

export const Alert = ({ message, alertVariant }: Props) => {
  const styles = variantStyles[alertVariant];
  const Icon: Record<typeof alertVariant, ReactNode> = {
    success: <CheckCircleIcon className="w-8 h-8 " aria-hidden="true" />,
    warning: <ExclamationCircleIcon className="w-8 h-8 " aria-hidden="true" />,
    error: <XCircleIcon className="w-8 h-8 " aria-hidden="true" />
  };
  return (
    <div className={clsx("relative bg-white shadow-sm rounded-md overflow-hidden border p-6", styles.border)}>
      <div
        className={clsx(
          "absolute top-0 left-[40%] w-full h-[250%] -translate-x-24 bg-linear-to-r to-transparent mix-blend-multiply opacity-20 rotate-12 blur-3xl",
          styles.gradient
        )}
      />
      <div className="flex items-center gap-3">
        <p className={clsx(styles.text, "[&_path]:stroke-2")}>
          <span>{Icon[alertVariant]}</span>
        </p>
        <p className="body-text">{message}</p>
      </div>
    </div>
  );
};
