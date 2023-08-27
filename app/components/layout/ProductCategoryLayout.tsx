import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";
import MobileNav from "../shared/MobileNav";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

interface Props {
  children: React.ReactNode;
  layoutTitle: string;
}

const ProductCategoryLayout = ({ children, layoutTitle }: Props) => {
  const { query } = useRouter();
  const pageTitle = query?.category as string;

  return (
    <>
      <Meta pageTitle={pageTitle} />
      <div className="bg-black h-[25rem] px-0 relative [ product-category-header ] md:px-[17.5rem] md:h-[33.6rem]">
        <Navigation removeHero={false} />
        <MobileNav />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <h2 className="[ heading-2 ] text-white">{layoutTitle}</h2>
        </div>
      </div>

      <section className="flex flex-col gap-[16rem] px-[2.4rem] md:px-[17.5rem]">
        <div className="pt-[6.4rem] pb-0 md:pb-[16.75rem] md:pt-[16rem]">{children}</div>
        <ProductThumbnails />
        <SubFooter />
      </section>

      <Footer />
    </>
  );
};

export default ProductCategoryLayout;
