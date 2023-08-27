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
    <nav
      className={clsx(
        "flex flex-col items-center gap-[1.6rem] flex-wrap md:flex-row md:gap-[3.4rem]",
        !isFooter && "md:mr-auto",
        isFooter && "mt-[4.8rem] md:mt-0"
      )}
    >
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
