"use client";

import React from "react";
import { clsx } from "clsx";
import Brand from "./Brand";
import Cart from "../Cart/Cart";
import NavigationLinks from "./NavLink";

const Navigation = ({ removeHero }: { removeHero: boolean }) => {
  return (
    <nav className={clsx("hidden lg:flex lg:flex-wrap lg:py-[3.5rem]", !removeHero && "[ nav ]")}>
      <Brand />
      <NavigationLinks />
      <Cart />
    </nav>
  );
};

export default Navigation;
