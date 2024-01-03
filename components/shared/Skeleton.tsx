import { HTMLAttributes } from "react";
import { clsx } from "clsx";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export default function Skeleton({ className, ...props }: Props) {
  return <div className={clsx("animate-pulse rounded-md bg-primary/40", className)} {...props} />;
}
