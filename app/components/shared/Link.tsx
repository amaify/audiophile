import Link from "next/link";
import React from "react";

interface Props {
  btnText: string;
  btnLink: string;
  onClick?: () => void;
}

const LinkButton = ({ btnLink, btnText, onClick }: Props) => {
  return (
    <Link
      href={btnLink}
      className="bg-primary block hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]"
      onClick={onClick}
    >
      {btnText}
    </Link>
  );
};

export default LinkButton;
