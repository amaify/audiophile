import React from "react";
import dynamic from "next/dynamic";
import Navigation from "./shared/Navigation";
import Button from "./shared/Button";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

const Hero = () => {
  return (
    <header className="[ hero ] relative px-[17.5rem]">
      <Meta pageTitle="Home" />
      <div className="">
        <Navigation removeHero={false} />

        <div className="w-[39.8rem] absolute top-[30%] left-[17.5rem]">
          <p className="[ overline-text ] text-white opacity-50 mb-[24px]">new product</p>
          <h1 className="[ heading-1 ] text-white mb-[24px]">
            <span className="block">xx99 mark ii</span>
            <span>headphones</span>
          </h1>
          <p className="[ body-text ] text-white opacity-75 w-[90%] mb-[40px]">
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>
          <Button btnText="see product" btnType={1} to="headphones/xx99" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
