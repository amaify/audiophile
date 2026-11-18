import Link from "next/link";
import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/helpers/cn";
import ArrowRightIcon from "@/public/shared/desktop/icon-arrow-right.svg";

export const buttonVariants = cva(
  [
    "flex items-center justify-center text-[1.3rem] leading-[1.8] font-bold tracking-[1px] uppercase",
    "transition-all duration-300 disabled:cursor-not-allowed"
  ],
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover",
        outline: "border border-black bg-transparent text-black hover:bg-black hover:text-white",
        dark: "border border-black bg-black text-white hover:border-charcoal hover:bg-charcoal",
        link: "gap-[1.332rem] text-black/50 hover:text-primary"
      },
      size: {
        default: "h-[4.8rem] w-[16rem] lg:h-[4rem] lg:w-[16.8rem]",
        block: "w-full py-[1.5rem]",
        full: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface Props extends ButtonVariantProps {
  btnText: string;
  to: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ btnText, to, variant, size, className, onClick }: Props) => {
  return (
    <Link href={to} className={cn(buttonVariants({ variant, size }), className)} onClick={onClick}>
      <span>{btnText}</span>
      {variant === "link" && (
        <span>
          <Image src={ArrowRightIcon} alt="Arrow Right" width={5} height={10} className="h-auto w-auto" />
        </span>
      )}
    </Link>
  );
};

export default Button;
