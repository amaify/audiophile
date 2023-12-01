import React from "react";
import { clsx } from "clsx";
import dynamic from "next/dynamic";
import Brand from "./Brand";

const Cart = dynamic(import("@/components/Cart/Cart"), { ssr: false });
const NavigationLinks = dynamic(import("./NavLink"), { ssr: false });

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
