"use client";

import React from "react";
import { clsx } from "clsx";
import Brand from "./Brand";
import Cart from "../Cart/Cart";
import NavigationLinks from "./NavLink";

interface Props {
  removeHero: boolean;
  subpageHeader?: boolean;
}

const Navigation = ({ removeHero, subpageHeader }: Props) => {
  return (
    <nav
      className={clsx(
        "hidden lg:flex lg:flex-wrap lg:pt-[3.5rem]",
        !removeHero && "[ nav ]",
        subpageHeader && "lg:py-[3.5rem]"
      )}
    >
      <Brand />
      <NavigationLinks />
      <Cart />
    </nav>
  );
};

export default Navigation;
