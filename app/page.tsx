import Image from "next/image";
import clsx from "clsx";
import { Metadata } from "next";
import { fetchHygraphData } from "@/helpers/ServiceClient";
import type { HeroSectionData } from "@/Types/sharedTypes";
import Hero from "@/components/layout/Hero";
import Button from "@/components/shared/Button";
import SpeakerZX9Image from "@/public/home/desktop/image-speaker-zx9.png";
import CirclePattern from "@/public/home/desktop/pattern-circles.svg";
import SubFooter from "@/components/shared/SubFooter";
import Footer from "@/components/shared/Footer";
import ProductThumbnails from "@/app/[category]/components/ProductThumbnails";
import { getHeroSection } from "@/queries/AllQueries";

async function getHeroSectionData() {
  let requestError = "";
  let heroSectionData!: HeroSectionData;
  try {
    const { data } = await fetchHygraphData<HeroSectionData>({
      query: getHeroSection
    });
    heroSectionData = data;
  } catch (error: any) {
    console.error(JSON.stringify(error, undefined, 4));
    requestError = `Fetch failed: Could not retrieve hero data due to ${error.message}`;
  }

  return {
    heroSectionData,
    requestError
  };
}

export const metadata: Metadata = {
  title: "Audiophile - Home"
};

export default async function Page() {
  const { heroSectionData, requestError } = await getHeroSectionData();
  const isHeroSectionError = !!requestError || heroSectionData.heroSections.length === 0;

  return (
    <main>
      <Hero
        heroItem={!isHeroSectionError ? heroSectionData.heroSections : [{ title: "", description: "", category: "" }]}
        error={isHeroSectionError ? "Could not get content" : requestError}
      />
      <div className="layout-padding">
        <div className="mb-48 mt-48 relative lg:mt-80 lg:mb-[16.8rem]">
          <ProductThumbnails />
        </div>

        <div className="flex flex-col gap-48 relative w-full md:gap-80">
          <div className="flex flex-col gap-12">
            <div className="bg-primary rounded-lg relative w-full flex h-240 pb-22 overflow-hidden lg:h-224 lg:pr-22 xl:pr-38">
              <div
                className={clsx(
                  "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[17.2rem] h-[20.9rem] z-10",
                  "lg:top-[23.5%] lg:left-[8.8rem] lg:h-[44.3rem] lg:w-[36.23rem] lg:translate-x-0 lg:translate-y-0",
                  "xl:top-[15%] xl:left-[11.8rem] xl:h-[49.3rem] xl:w-[41.23rem] xl:translate-x-0 xl:translate-y-0"
                )}
              >
                <Image src={SpeakerZX9Image} alt="ZX9 Speaker" className="w-full" />
              </div>
              <div className="absolute scale-[1.8] lg:top-[-12%] lg:left-[-11%] lg:scale-105 z-0">
                <Image src={CirclePattern} alt="Pattern of Circles" className="object-cover" />
              </div>

              <div className="w-full flex items-end justify-center relative z-20 lg:items-center lg:justify-end">
                <div className="w-[34.9rem] text-center px-[2.4rem] lg:text-left xl:px-0">
                  <h1 className="heading-1 text-white mb-6">
                    <span className="block">zx9</span>
                    <span>speaker</span>
                  </h1>
                  <p className="body-text text-white w-full mb-10 opacity-[0.75]">
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Button btnText="see product" variant="dark" to="/speakers/zx9-speaker" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full h-128 rounded-lg bg-zx7-mobile bg-cover bg-center sm:bg-zx7-tablet md:bg-zx7-desktop">
              <div className="pl-[2.4rem] sm:pl-[6.225rem] lg:pl-[12.6rem]">
                <h4 className="heading-4 mb-[3.2rem]">zx7 speaker</h4>
                <Button btnText="see product" variant="outline" to="speakers" />
              </div>
            </div>

            <div className="flex flex-col gap-12 w-full sm:flex-row sm:gap-[1.1rem]">
              <div className="rounded-lg w-full h-80 bg-yx1-mobile bg-cover bg-center sm:h-128 sm:bg-yx1-tablet md:w-1/2 xl:bg-yx1-desktop" />
              <div className="flex items-center pl-[2.4rem] bg-dark-grey h-80 w-full rounded-lg sm:pl-[4.1rem] md:w-1/2 lg:pl-38 sm:h-128">
                <div>
                  <h4 className="heading-4 mb-8">YX1 earphones</h4>
                  <Button btnText="see product" variant="outline" to="/earphones/yx1-wireless-earphones" />
                </div>
              </div>
            </div>
          </div>
          <SubFooter />
        </div>
      </div>

      <Footer />
    </main>
  );
}
