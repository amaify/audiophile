import React from "react";
import Link from "next/link";
import Image from "next/image";
import { clsx } from "clsx";
import ArrowRightIcon from "../../assets/shared/desktop/icon-arrow-right.svg";

interface Props {
  btnType: number;
  btnText: string;
  to: string;
}

const Button = ({ btnText, btnType, to }: Props) => {
  const buttonStyle = clsx(
    "[ phile-btn ]",
    btnType === 1 && "[ phile-btn-1 ]",
    btnType === 2 && "[ phile-btn-2 ]",
    btnType === 3 && "[ phile-btn-3 ]",
    btnType === 4 && "[ phile-btn-4 ]"
  );
  return (
    <Link href={to}>
      <span className={buttonStyle}>
        <span>{btnText}</span>
        {btnType === 3 && (
          <span>
            <Image src={ArrowRightIcon} alt="Arrow Right" width="5px" height="10px" />
          </span>
        )}
      </span>
    </Link>
  );
};

export default Button;
