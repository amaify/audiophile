import type { ReactNode } from "react";
import { ExclamationCircleIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

interface Props {
  message: string;
  alertVariant: "success" | "warning" | "error";
}

export const Alert = ({ message, alertVariant }: Props) => {
  const Icon: Record<typeof alertVariant, ReactNode> = {
    success: <CheckCircleIcon className="w-8 h-8 " aria-hidden="true" />,
    warning: <ExclamationCircleIcon className="w-8 h-8 " aria-hidden="true" />,
    error: <XCircleIcon className="w-8 h-8 " aria-hidden="true" />
  };
  return (
    <div className={clsx("relative bg-white shadow rounded-md overflow-hidden border p-6", `border-${alertVariant}`)}>
      <div
        className={`absolute top-0 -left-[-40%] w-[100%] h-[250%] -translate-x-24 bg-gradient-to-r from-${alertVariant} to-transparent mix-blend-multiply opacity-20 rotate-12 blur-3xl`}
      />
      <div className="flex items-center gap-3">
        <p className={`text-${alertVariant} [ phile-icon ]`}>
          <span>{Icon[alertVariant]}</span>
        </p>
        <p className="[ body-text ]">{message}</p>
      </div>
    </div>
  );
};
