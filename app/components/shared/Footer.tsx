import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavigationLinks from "./NavLink";
import FacebookIcon from "../../assets/shared/desktop/icon-facebook.svg";
import TwitterIcon from "../../assets/shared/desktop/icon-twitter.svg";
import InstagramIcon from "../../assets/shared/desktop/icon-instagram.svg";
import Brand from "./Brand";

const Footer = () => {
  return (
    <footer className="relative after:content-[' '] after:w-[101px] after:h-[4px] after:bg-primary after:block after:absolute after:top-0 after:left-[17.5em] [ footer ]">
      <div className="bg-black pt-[75px] pb-[48px] px-[17.5em] w-full">
        <nav className="flex mb-[36px] flex-wrap">
          <Brand />

          <NavigationLinks isFooter />
        </nav>

        <div className="flex items-end">
          <p className="[ body-text ] text-white opacity-50 w-[540px] mr-auto">
            Audiophile is an all in one stop to fulfill your audio needs. We&rsquo;re a small team of music lovers and
            sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo
            facility - we&sbquo;re open 7 days a week.
          </p>

          <div className="flex gap-[16px] items-baseline">
            <Link href="#facebook">
              <div className="hover: cursor-pointer">
                <Image src={FacebookIcon} alt="Audiophile Facebook page link" />
              </div>
            </Link>

            <Link href="#twitter">
              <div className="hover: cursor-pointer">
                <Image src={TwitterIcon} alt="Audiophile Twitter page link" />
              </div>
            </Link>

            <Link href="#instagram">
              <div className="hover: cursor-pointer">
                <Image src={InstagramIcon} alt="Audiophile Instagram page link" />
              </div>
            </Link>
          </div>
        </div>

        <p className="[ body-text ] font-bold text-white opacity-50 mt-[56px]">Copyright 2021. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
