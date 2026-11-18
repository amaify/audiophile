"use client";

import React from "react";
import { clsx } from "clsx";
import Brand from "./Brand";
import Cart from "../Cart/Cart";
import NavigationLinks from "./NavLink";

interface Props {
  removeHero: boolean;
  subpageHeader?: boolean;
  showUnderline?: boolean;
}

const Navigation = ({ removeHero, subpageHeader, showUnderline }: Props) => {
  return (
    <nav
      className={clsx(
        "hidden lg:flex lg:flex-wrap lg:pt-14 layout-padding",
        !removeHero && "after:mt-[3.6rem] after:h-px after:w-full after:bg-white after:opacity-20",
        subpageHeader && "lg:py-14"
      )}
    >
      <Brand />
      <NavigationLinks />
      <Cart />
    </nav>
  );
};

export default Navigation;
