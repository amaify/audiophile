import React from "react";
import { clsx } from "clsx";
import NavigationLinks from "./NavLink";
import Brand from "./Brand";
import Cart from "../Cart/Cart";

interface Props {
  removeHero: boolean;
}

const Navigation = ({ removeHero }: Props) => {
  return (
    <nav className={clsx("hidden lg:flex lg:flex-wrap lg:py-[3.5rem]", !removeHero && "[ nav ]")}>
      <Brand />
      <NavigationLinks />
      <Cart />
    </nav>
  );
};

export default Navigation;
