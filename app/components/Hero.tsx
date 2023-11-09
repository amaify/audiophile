import React from "react";
import dynamic from "next/dynamic";
import clsx from "clsx";
import Navigation from "./shared/Navigation";
import Button from "./shared/Button";
import MobileNav from "./shared/MobileNav";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

const Hero = () => {
  return (
    <header className="[ hero ] relative">
      <Meta pageTitle="Home" />
      <section className="[ layout-padding ]">
        <Navigation removeHero={false} />
        <MobileNav />
      </section>
      <section
        className={clsx(
          "w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center",
          "sm:w-[37.9rem] lg:w-[39.8rem] lg:top-[30%] lg:left-[17.5rem] lg:-translate-x-0 lg:-translate-y-0 lg:text-left"
        )}
      >
        <p className="[ overline-text ] text-white opacity-50 mb-6">new product</p>
        <h1 className="[ heading-1 ] text-white mb-6">
          <span className="block">xx99 mark ii</span>
          <span>headphones</span>
        </h1>
        <p className="[ body-text ] text-white opacity-75 w-full mb-10 sm:w-[90%]">
          Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
        </p>
        <div className="w-full flex justify-center lg:justify-start">
          <Button btnText="see product" btnType={1} to="headphones/xx99-mark-ii-headphones" />
        </div>
      </section>
    </header>
  );
};

export default Hero;
