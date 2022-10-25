import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { clsx } from "clsx";
import NavigationLinks from "./NavLink";
import CartIcon from "../../assets/shared/desktop/icon-cart.svg";
import Brand from "./Brand";

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

			<div className="hover: cursor-pointer">
				<Link href="#">
					<div>
						<Image src={CartIcon} alt="A shopping Cart" layout="fixed" />
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
