import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

interface Props {
  children: React.ReactNode;
  layoutTitle: string;
}

const ProductCategoryLayout = ({ children, layoutTitle }: Props) => {
  const router = useRouter();

  return (
    <>
      <Meta pageTitle={router.query.category as string} />
      <div className="bg-black h-[336px] px-[17.5rem] relative z-20">
        <Navigation removeHero={false} />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="[ heading-2 ] text-white">{layoutTitle}</h2>
        </div>
      </div>

      <section className="flex flex-col gap-[16rem] px-[17.5rem]">
        <div className="pt-[16rem]">{children}</div>
        <ProductThumbnails />
        <SubFooter />
      </section>

      <Footer />
    </>
  );
};

export default ProductCategoryLayout;
