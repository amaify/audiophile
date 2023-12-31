import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import FacebookIcon from "@/public/shared/desktop/icon-facebook.svg";
import TwitterIcon from "@/public/shared/desktop/icon-twitter.svg";
import InstagramIcon from "@/public/shared/desktop/icon-instagram.svg";
import Brand from "./Brand";
import NavigationLinks from "./NavLink";

const footerSocialLinks = [
  { title: "Facebook", imgSrc: FacebookIcon },
  { title: "Twitter", imgSrc: TwitterIcon },
  { title: "Instagram", imgSrc: InstagramIcon }
] as const;

export default function Footer() {
  return (
    <footer
      className={clsx(
        "relative mt-auto after:content-[' '] after:w-[10.1rem] after:h-[.4rem] after:bg-primary after:block",
        "after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2",
        "sm:after:left-[8.8rem]",
        "lg:after:left-[9.8rem]",
        "xl:after:left-[17.5rem] xl:after:-translate-x-0 [ footer ]"
      )}
    >
      <div className="bg-black pt-[5.2rem] pb-[4.8rem] px-[2.4rem] w-full sm:px-[4rem] lg:px-[5rem] xl:px-[17.5rem] xl:pt-[7.5rem]">
        <nav className="flex flex-col items-center mb-[4.8rem] flex-wrap sm:items-start lg:flex-row lg:mb-[3.6rem]">
          <Brand isFooter />
          <NavigationLinks isFooter />
        </nav>

        <div className="flex flex-col items-center gap-[4.8rem] sm:flex-row sm:flex-wrap lg:items-end lg:gap-0">
          <p className="[ body-text ] text-white/50 w-full text-center sm:text-left lg:w-[54rem] lg:mr-auto">
            Audiophile is an all in one stop to fulfill your audio needs. We&rsquo;re a small team of music lovers and
            sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo
            facility - we&sbquo;re open 7 days a week.
          </p>

          <div className="flex w-full gap-[1.6rem] items-baseline justify-center order-last sm:justify-start sm:w-auto lg:order-none lg:w-[40%] lg:justify-end xl:w-1/2">
            {footerSocialLinks.map((link) => (
              <Link href="#facebook" className="hover:cursor-pointer" key={link.title}>
                <Image src={link.imgSrc} alt={`Audiophile ${link.title} page link`} />
              </Link>
            ))}
          </div>
          <p className="[ body-text ] font-bold text-white/50 text-center sm:mr-auto lg:text-left lg:mt-[5.6rem] lg:mr-0">
            {`Copyright ${new Date().getFullYear()}. All Rights Reserved`}
          </p>
        </div>
      </div>
    </footer>
  );
}
