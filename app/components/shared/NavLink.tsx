import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "../util/utils";

interface Props {
  isFooter?: boolean;
}

const NavigationLinks = ({ isFooter }: Props) => {
  const router = useRouter();
  const pathName = router.asPath;

  return (
    <nav className={clsx("flex gap-[34px] flex-wrap", !isFooter && "mr-auto")}>
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={`${link.href}`}
          className={clsx("[ nav-link ] hover:cursor-pointer", pathName.includes(link.name) && "[ nav-link-active ]")}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationLinks;
