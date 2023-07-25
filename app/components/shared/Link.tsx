import Link from "next/link";
import React from "react";

interface Props {
  btnText: string;
  btnLink: string;
}

const LinkButton = ({ btnLink, btnText }: Props) => {
  return (
    <Link href={btnLink}>
      <span className="bg-primary block hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]">
        {btnText}
      </span>
    </Link>
  );
};

export default LinkButton;
