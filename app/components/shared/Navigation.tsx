import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "./utils";
import { clsx } from "clsx";
import BrandLogo from "../../assets/shared/desktop/logo.svg";
import CartIcon from "../../assets/shared/desktop/icon-cart.svg";

interface Props {
	detailsPage: boolean;
}

const Navigation = ({ detailsPage }: Props) => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<div
			className={clsx("flex flex-wrap pt-[32px]", !detailsPage && "[ nav ]")}
		>
			<div className="mr-auto hover: cursor-pointer">
				<Link href="/">
					<div>
						<Image src={BrandLogo} alt="Brand Logo of Audiophile" />
					</div>
				</Link>
			</div>
			<ul className="flex gap-[34px] mr-auto">
				{navLinks.map((link) => (
					<li key={link.name}>
						<Link href={`${link.slug}`}>
							<a
								className={clsx(
									"[ nav-link ]",
									pathname === link.slug && "[ nav-link-active ]"
								)}
							>
								{link.name}
							</a>
						</Link>
					</li>
				))}
			</ul>
			<div className="hover: cursor-pointer">
				<Link href="#">
					<div>
						<Image src={CartIcon} alt="A shopping Cart" />
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Navigation;
