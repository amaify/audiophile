import React from "react";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import NavigationLinks from "./NavLink";
import Brand from "./Brand";
import Cart from "../Cart/Cart";

interface Props {
  removeHero: boolean;
}

const Navigation = ({ removeHero }: Props) => {
  const router = useRouter();
  const { asPath } = router;

  return (
    <nav className={clsx("flex flex-wrap pt-[32px]", !removeHero && "[ nav ]")}>
      <Brand />
      <NavigationLinks pathName={asPath} />
      <Cart />
    </nav>
  );
};

export default Navigation;
