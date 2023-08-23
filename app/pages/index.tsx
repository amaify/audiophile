import type { NextPage } from "next";
import Image from "next/image";
import Hero from "../components/Hero";
import Footer from "../components/shared/Footer";
import ProductThumbnails from "../components/shared/ProductThumbnails";
import SpeakerZX9Image from "../assets/home/desktop/image-speaker-zx9.png";
import CirclePattern from "../assets/home/desktop/pattern-circles.svg";
import Speakerzx7Image from "../assets/home/desktop/image-speaker-zx7.jpg";
import EarphoneYX1Image from "../assets/home/desktop/image-earphones-yx1.jpg";
import Button from "../components/shared/Button";
import SubFooter from "../components/shared/SubFooter";

const Home: NextPage = () => {
  return (
    <section>
      <Hero />
      <div className="mt-[20rem] mb-[16.8rem] px-[17.5rem] relative">
        <ProductThumbnails />
      </div>

      <div className="px-[17.5rem] flex flex-col gap-[20rem] relative w-full">
        <div className="flex flex-col gap-[48px]">
          <div className="bg-primary rounded-lg relative w-full h-[56em] overflow-hidden">
            <div className="absolute top-[15%] left-[118px] w-[41.23em] h-[49.3em] z-10">
              <Image src={SpeakerZX9Image} alt="ZX9 Speaker" className="w-full" />
            </div>
            <div className="absolute -top-[12%] -left-[11%]">
              <Image src={CirclePattern} alt="Pattern of Circles" width={1000} height={1000} objectFit="cover" />
            </div>

            <div className="w-[349px] absolute top-[133px] right-[95px]">
              <h1 className="[ heading-1 ] text-white mb-[24px]">
                <span className="block">zx9</span>
                <span>speaker</span>
              </h1>
              <p className="[ body-text ] text-white w-full mb-[40px] opacity-[0.75]">
                Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
              </p>
              <Button btnText="see product" btnType={4} to="/speakers/zx9-speaker" />
            </div>
          </div>

          <div className="relative w-full">
            <Image src={Speakerzx7Image} alt="ZX7 Speaker" className="rounded-lg w-full h-full" />
            <div className="absolute top-1/2 left-40 -translate-x-0 -translate-y-1/2">
              <h4 className="[ heading-4 ] mb-[3.2rem]">zx7 speaker</h4>
              <Button btnText="see product" btnType={2} to="speakers" />
            </div>
          </div>

          <div className="flex gap-[30px] w-full">
            <div className="w-1/2 h-[320px] relative">
              <Image src={EarphoneYX1Image} alt="YX1 Earphnes" className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="bg-darkGrey h-[320px] w-1/2 rounded-[8px] relative">
              <div className="absolute top-[101px] left-[95px]">
                <h4 className="[ heading-4 ] mb-[3.2rem]">YX1 earphones</h4>
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
