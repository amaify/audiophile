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
    <ul className={clsx("flex gap-[34px] flex-wrap", !isFooter && "mr-auto")}>
      {navLinks.map((link) => (
        <li key={link.name}>
          <Link href={`${link.href}`}>
            <span
              className={clsx("[ nav-link ] hover:cursor-pointer", pathName === link.href && "[ nav-link-active ]")}
            >
              {link.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavigationLinks;
