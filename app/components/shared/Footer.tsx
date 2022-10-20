import React from "react";
import { navLinks } from "./utils";
import BrandLogo from "../../assets/shared/desktop/logo.svg";
import FacebookIcon from "../../assets/shared/desktop/icon-facebook.svg";
import TwitterIcon from "../../assets/shared/desktop/icon-twitter.svg";
import InstagramIcon from "../../assets/shared/desktop/icon-instagram.svg";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/router";

const Footer = () => {
	const router = useRouter();
	const { pathname } = router;
	return (
		<div className="relative before:content-[' '] before:w-[101px] before:h-[4px] before:bg-primary before:block before:absolute before:top-0 before:left-[165px]">
			<div className="bg-black pt-[75px] px-[165px] pb-[48px]">
				<div className="flex mb-[36px]">
					<div className="mr-auto hover: cursor-pointer">
						<Link href="/">
							<div>
								<Image src={BrandLogo} alt="Brand Logo of Audiophile" />
							</div>
						</Link>
					</div>

					<ul className="flex gap-[34px]">
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
				</div>

				<div className="flex items-end">
					<p className="[ body-text ] text-white opacity-50 w-[540px] mr-auto">
						Audiophile is an all in one stop to fulfill your audio needs. We're
						a small team of music lovers and sound specialists who are devoted
						to helping you get the most out of personal audio. Come and visit
						our demo facility - we’re open 7 days a week.
					</p>

					<div className="flex gap-[16px] items-baseline">
						<Link href="#">
							<div className="hover: cursor-pointer">
								<Image src={FacebookIcon} alt="Audiophile Facebook page link" />
							</div>
						</Link>

						<Link href="#">
							<div className="hover: cursor-pointer">
								<Image src={TwitterIcon} alt="Audiophile Twitter page link" />
							</div>
						</Link>

						<Link href="#">
							<div className="hover: cursor-pointer">
								<Image
									src={InstagramIcon}
									alt="Audiophile Instagram page link"
								/>
							</div>
						</Link>
					</div>
				</div>

				<p className="[ body-text ] font-bold text-white opacity-50 mt-[56px]">
					Copyright 2021. All Rights Reserved
				</p>
			</div>
		</div>
	);
};

export default Footer;
