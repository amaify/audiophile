import React from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "../../assets/shared/desktop/logo.svg";

const Brand = () => {
  return (
    <Link href="/" className="mr-auto hover:cursor-pointer">
      <Image src={BrandLogo} alt="Brand Logo of Audiophile" />
    </Link>
  );
};

export default Brand;
