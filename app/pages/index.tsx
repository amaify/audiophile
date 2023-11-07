import type { NextPage } from "next";
import Image from "next/image";
import Hero from "../components/Hero";
import Footer from "../components/shared/Footer";
import ProductThumbnails from "../components/shared/ProductThumbnails";
import SpeakerZX9Image from "../assets/home/desktop/image-speaker-zx9.png";
import CirclePattern from "../assets/home/desktop/pattern-circles.svg";
import Button from "../components/shared/Button";
import SubFooter from "../components/shared/SubFooter";

const Home: NextPage = () => {
  return (
    <section>
      <Hero />
      <div className="mb-[12rem] mt-48 px-[2.4rem] relative md:mt-[20rem] md:px-[17.5rem] md:mb-[16.8rem]">
        <ProductThumbnails />
      </div>

      <div className="px-[2.4rem] flex flex-col gap-[12rem] relative w-full md:px-[17.5rem] md:gap-[20rem]">
        <div className="flex flex-col gap-12">
          <div className="bg-primary rounded-lg relative w-full flex h-[60rem] pb-[5.5rem] overflow-hidden md:h-[56rem] md:pr-[9.5rem]">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[17.2rem] h-[20.9rem] z-10 md:top-[15%] md:left-[11.8rem] md:h-[49.3rem] md:w-[41.23rem] md:-translate-x-0 md:-translate-y-0">
              <Image src={SpeakerZX9Image} alt="ZX9 Speaker" className="w-full" />
            </div>
            <div className="absolute scale-[1.8] md:-top-[12%] md:-left-[11%] md:scale-105 z-0">
              <Image src={CirclePattern} alt="Pattern of Circles" className="object-cover" />
            </div>

            <div className="w-full flex items-end justify-center relative z-20 md:items-center md:justify-end">
              <div className="w-[34.9rem] text-center px-[2.4rem] md:text-left md:px-0">
                <h1 className="[ heading-1 ] text-white mb-6">
                  <span className="block">zx9</span>
                  <span>speaker</span>
                </h1>
                <p className="[ body-text ] text-white w-full mb-[40px] opacity-[0.75]">
                  Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                </p>
                <div className="flex justify-center md:justify-start">
                  <Button btnText="see product" btnType={4} to="/speakers/zx9-speaker" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center w-full rounded-lg [ trial ]">
            <div className="pl-[2.4rem] md:pl-[12.6rem]">
              <h4 className="[ heading-4 ] mb-[3.2rem]">zx7 speaker</h4>
              <Button btnText="see product" btnType={2} to="speakers" />
            </div>
          </div>

          <div className="flex flex-col gap-[3rem] w-full md:flex-row">
            <div className="rounded-lg w-full md:w-1/2 [ trial-2 ]" />
            <div className="flex items-center pl-[2.4rem] bg-darkGrey h-[20rem] w-full rounded-lg md:w-1/2 md:pl-[9.5rem] md:h-[32rem]">
              <div>
                <h4 className="[ heading-4 ] mb-8">YX1 earphones</h4>
                <Button btnText="see product" btnType={2} to="/earphones/yx1-wireless-earphones" />
              </div>
            </div>
          </div>
        </div>
        <SubFooter />
      </div>

      <Footer />
    </section>
  );
};

export default Home;
