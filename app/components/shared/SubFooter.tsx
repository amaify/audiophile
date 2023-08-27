import React from "react";
import Image from "next/image";
import BestGearImage from "../../assets/shared/desktop/image-best-gear.jpg";

const SubFooter = () => {
  return (
    <section className="flex flex-col-reverse w-full gap-[4rem] mb-[12rem] relative -z-10 md:flex-row md:gap-[12.5rem] md:mb-[16rem]">
      <div className="w-full self-center mr-0 text-center md:w-1/2 md:mr-auto md:text-left">
        <h2 className="[ heading-2 ] mb-[3.2rem]">
          <span className="block">bringing you the</span>
          <span>
            <span className="text-primary">best</span> audio gear
          </span>
        </h2>
        <p className="[ body-text ] opacity-50">
          Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones,
          speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to
          browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who
          make Audiophile the best place to buy your portable audio equipment.
        </p>
      </div>
      <div className="w-full h-[30rem] md:w-[54rem] md:h-auto">
        <Image src={BestGearImage} alt="Best gear" className="w-full h-full rounded-lg object-cover" />
      </div>
    </section>
  );
};

export default SubFooter;
