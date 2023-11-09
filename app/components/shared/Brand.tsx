import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import BrandLogo from "../../assets/shared/desktop/logo.svg";

interface Props {
  isFooter?: boolean;
}

const Brand = ({ isFooter }: Props) => {
  return (
    <Link href="/" className={clsx("hover:cursor-pointer", isFooter ? "mr-0 md:mr-auto" : "mr-auto ")}>
      <Image src={BrandLogo} alt="Brand Logo of Audiophile" />
    </Link>
  );
};

export default Brand;
