import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { navLinks } from "./utils";
import { clsx } from "clsx";
import BrandLogo from "../../../assets/shared/desktop/logo.svg";
import CartIcon from "../../../assets/shared/desktop/icon-cart.svg";

const Navigation = () => {
	const router = useRouter();
	const { pathname } = router;

	return (
		<div className="flex flex-wrap pt-[32px] || after:content-[''] after:bg-[#FFFFFF] after:w-full after:h-[1px] after:opacity-20 after:mt-[36px]">
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
