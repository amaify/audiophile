import React from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import { HomePageContent } from "@/Types/shared-types";
import Navigation from "./shared/Navigation";
import Button from "./shared/Button";
import MobileNav from "./shared/MobileNav";
import { Alert } from "./shared/Alert";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

interface Props {
  heroItem: HomePageContent["homePageHeroes"];
  error: string;
}

const Hero = ({ heroItem, error }: Props) => {
  const { heroTitle, heroDescription, heroCategory } = heroItem[0];
  const heroSlug = `${heroTitle.toLowerCase().replaceAll(" ", "-")}-${heroCategory.toLowerCase()}`;

  return (
    <header className={clsx("relative", !error ? "[ hero ]" : "[ hero-error ]")}>
      <Meta pageTitle="Home" />
      <section className="[ layout-padding ]">
        <Navigation removeHero={false} />
        <MobileNav />
      </section>
      {!error ? (
        <section
          className={clsx(
            "w-[32.8rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
            "sm:w-[37.9rem] lg:w-[39.8rem] lg:top-[30%] lg:left-[10.5rem] lg:-translate-x-0 lg:-translate-y-0 lg:text-left",
            "lg:w-[39.8rem] xl:left-[17.5rem]"
          )}
        >
          <p className="[ overline-text ] text-white opacity-50 mb-6">new product</p>
          <h1 className="[ heading-1 ] text-white mb-6">
            <span className="block">{heroTitle}</span>
            <span>headphones</span>
          </h1>
          <p className="[ body-text ] text-white opacity-75 w-full mb-10 sm:w-[90%]">{heroDescription}</p>
          <div className="w-full flex justify-center lg:justify-start">
            <Button btnText="see product" btnType={1} to={`${heroCategory.toLowerCase()}/${heroSlug}`} />
          </div>
        </section>
      ) : (
        <div className="[ layout-padding ]">
          <Alert alertVariant="error" message={error} />
        </div>
      )}
    </header>
  );
};

export default Hero;
