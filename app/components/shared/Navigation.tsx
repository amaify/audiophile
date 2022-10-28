import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import NavigationLinks from "./NavLink";
import Brand from "./Brand";
import Cart from "./Cart/Cart";

interface Props {
	detailsPage: boolean;
}

const Navigation = ({ detailsPage }: Props) => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<nav
			className={clsx("flex flex-wrap pt-[32px]", !detailsPage && "[ nav ]")}
		>
			<Brand />
			<NavigationLinks pathName={pathname} />
			<Cart />
		</nav>
	);
};

export default Navigation;
