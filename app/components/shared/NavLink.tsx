import React from "react";
import clsx from "clsx";
import Link from "next/link";
import { navLinks } from "./utils";

interface Props {
	pathName: string;
	isFooter?: boolean;
}

const NavigationLinks = ({ pathName, isFooter }: Props) => {
	return (
		<ul className={clsx("flex gap-[34px] flex-wrap", !isFooter && "mr-auto")}>
			{navLinks.map((link) => (
				<li key={link.name}>
					<Link href={`${link.slug}`}>
						<a
							className={clsx(
								"[ nav-link ]",
								pathName === link.slug && "[ nav-link-active ]"
							)}
						>
							{link.name}
						</a>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default NavigationLinks;
