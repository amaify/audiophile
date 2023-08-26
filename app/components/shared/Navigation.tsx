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
    <nav className={clsx("hidden lg:flex lg:flex-wrap lg:pt-8", !removeHero && "[ nav ]")}>
      <Brand />
      <NavigationLinks />
      <Cart />
    </nav>
  );
};

export default Navigation;
