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
      <div className="mb-[16.8rem] mt-48 px-[2.4rem] relative md:mt-[20rem] md:px-[17.5rem]">
        <ProductThumbnails />
      </div>

      <div className="px-[17.5rem] flex flex-col gap-[20rem] relative w-full">
        <div className="flex flex-col gap-12">
          <div className="bg-primary rounded-lg relative w-full h-[56rem] overflow-hidden">
            <div className="absolute top-[15%] left-[11.8rem] w-[41.23rem] h-[49.3rem] z-10">
              <Image src={SpeakerZX9Image} alt="ZX9 Speaker" className="w-full" />
            </div>
            <div className="absolute -top-[12%] -left-[11%]">
              <Image src={CirclePattern} alt="Pattern of Circles" width={1000} height={1000} className="object-cover" />
            </div>

            <div className="w-[34.9rem] absolute top-[13.3rem] right-[9.5rem]">
              <h1 className="[ heading-1 ] text-white mb-6">
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

          <div className="flex gap-[3rem] w-full">
            <div className="w-1/2 h-[32rem] relative">
              <Image src={EarphoneYX1Image} alt="YX1 Earphnes" className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="bg-darkGrey h-[32rem] w-1/2 rounded-lg relative">
              <div className="absolute top-[10.1rem] left-[9.5rem]">
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
