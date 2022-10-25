import React from "react";
import NavigationLinks from "./NavLink";
import FacebookIcon from "../../assets/shared/desktop/icon-facebook.svg";
import TwitterIcon from "../../assets/shared/desktop/icon-twitter.svg";
import InstagramIcon from "../../assets/shared/desktop/icon-instagram.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Brand from "./Brand";

const Footer = () => {
	const router = useRouter();
	const { pathname } = router;
	return (
		<footer className="relative before:content-[' '] before:w-[101px] before:h-[4px] before:bg-primary before:block before:absolute before:top-0 before:left-[325px]">
			<div className="bg-black pt-[75px] px-xl pb-[48px] w-full">
				<nav className="flex mb-[36px] flex-wrap">
					<Brand />

					<NavigationLinks pathName={pathname} isFooter={true} />
				</nav>

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
		</footer>
	);
};

export default Footer;
