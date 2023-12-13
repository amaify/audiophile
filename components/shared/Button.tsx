import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import ArrowRightIcon from "@/public/shared/desktop/icon-arrow-right.svg";

interface Props {
  btnType: number;
  btnText: string;
  to: string;
  onClick?: () => void;
}

const Button = ({ btnText, btnType, to, onClick }: Props) => {
  const buttonStyle = clsx(
    "[ phile-btn ]",
    btnType === 1 && "[ phile-btn-1 ]",
    btnType === 2 && "[ phile-btn-2 ]",
    btnType === 3 && "[ phile-btn-3 ]",
    btnType === 4 && "[ phile-btn-4 ]"
  );

  return (
    <Link href={to} className={clsx(buttonStyle, "flex items-center justify-center w-full")} onClick={onClick}>
      <span>{btnText}</span>
      {btnType === 3 && (
        <span>
          <Image src={ArrowRightIcon} alt="Arrow Right" width={5} height={10} className="w-auto h-auto" />
        </span>
      )}
    </Link>
  );
};

export default Button;
