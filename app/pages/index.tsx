import Image from "next/image";
import clsx from "clsx";
import dynamic from "next/dynamic";
import { fetchDataFromAdmin } from "@/helpers/ServiceClient";
import { HOME_PAGE_HERO_SECTION } from "@/queries/AllQueries";
import { HomePageContent } from "@/Types/shared-types";
import Hero from "@/components/layout/Hero";
import Button from "@/components/shared/Button";
import SpeakerZX9Image from "@/public/home/desktop/image-speaker-zx9.png";
import CirclePattern from "@/public/home/desktop/pattern-circles.svg";

const Footer = dynamic(import("@/components/shared/Footer"), { ssr: false });
const SubFooter = dynamic(import("@/components/shared/SubFooter"), { ssr: false });
const ProductThumbnails = dynamic(import("@/components/shared/ProductThumbnails"), { ssr: false });

interface Props {
  data: HomePageContent;
  error: string;
}

export default function Home({ data, error }: Props) {
  return (
    <section>
      <Hero
        heroItem={!error ? data.homePageHeroes : [{ heroCategory: "", heroDescription: "", heroTitle: "" }]}
        error={error}
      />
      <div className="[ layout-padding ]">
        <div className="mb-[12rem] mt-48 relative lg:mt-[20rem] lg:mb-[16.8rem]">
          <ProductThumbnails />
        </div>

        <div className="flex flex-col gap-[12rem] relative w-full md:gap-[20rem]">
          <div className="flex flex-col gap-12">
            <div className="bg-primary rounded-lg relative w-full flex h-[60rem] pb-[5.5rem] overflow-hidden lg:h-[56rem] lg:pr-[5.5rem] xl:pr-[9.5rem]">
              <div
                className={clsx(
                  "absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[17.2rem] h-[20.9rem] z-10",
                  "lg:top-[23.5%] lg:left-[8.8rem] lg:h-[44.3rem] lg:w-[36.23rem] lg:-translate-x-0 lg:-translate-y-0",
                  "xl:top-[15%] xl:left-[11.8rem] xl:h-[49.3rem] xl:w-[41.23rem] xl:-translate-x-0 xl:-translate-y-0"
                )}
              >
                <Image src={SpeakerZX9Image} alt="ZX9 Speaker" className="w-full" />
              </div>
              <div className="absolute scale-[1.8] lg:-top-[12%] lg:-left-[11%] lg:scale-105 z-0">
                <Image src={CirclePattern} alt="Pattern of Circles" className="object-cover" />
              </div>

              <div className="w-full flex items-end justify-center relative z-20 lg:items-center lg:justify-end">
                <div className="w-[34.9rem] text-center px-[2.4rem] lg:text-left xl:px-0">
                  <h1 className="[ heading-1 ] text-white mb-6">
                    <span className="block">zx9</span>
                    <span>speaker</span>
                  </h1>
                  <p className="[ body-text ] text-white w-full mb-[40px] opacity-[0.75]">
                    Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
                  </p>
                  <div className="flex justify-center lg:justify-start">
                    <Button btnText="see product" btnType={4} to="/speakers/zx9-speaker" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center w-full rounded-lg [ home-products ]">
              <div className="pl-[2.4rem] sm:pl-[6.225rem] lg:pl-[12.6rem]">
                <h4 className="[ heading-4 ] mb-[3.2rem]">zx7 speaker</h4>
                <Button btnText="see product" btnType={2} to="speakers" />
              </div>
            </div>

            <div className="flex flex-col gap-[3rem] w-full sm:flex-row sm:gap-[1.1rem]">
              <div className="rounded-lg w-full md:w-1/2 [ home-products-2 ]" />
              <div className="flex items-center pl-[2.4rem] bg-darkGrey h-[20rem] w-full rounded-lg sm:pl-[4.1rem] md:w-1/2 lg:pl-[9.5rem] sm:h-[32rem]">
                <div>
                  <h4 className="[ heading-4 ] mb-8">YX1 earphones</h4>
                  <Button btnText="see product" btnType={2} to="/earphones/yx1-wireless-earphones" />
                </div>
              </div>
            </div>
          </div>
          <SubFooter />
        </div>
      </div>

      <Footer />
    </section>
  );
}

export async function getServerSideProps() {
  try {
    const { data } = await fetchDataFromAdmin<HomePageContent>({
      query: HOME_PAGE_HERO_SECTION
    });

    return {
      props: { data }
    };
  } catch (error: any) {
    console.error(JSON.stringify(error, undefined, 4));
    return {
      props: {
        error: `Fetch failed: Could not retrieve hero data due to ${error.message}`
      }
    };
  }
}
