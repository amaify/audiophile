import React from "react";
import dynamic from "next/dynamic";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

interface Props {
  children: JSX.Element;
  pageTitle: string;
  removeSubFooter: boolean;
}

const ProductDetailsLayout = ({ children, pageTitle, removeSubFooter }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />

      <div className="bg-black h-[9.7rem] px-[17.5rem] relative z-50">
        <Navigation removeHero={true} />
      </div>

      <div className="px-[17.5rem] mt-[7.9rem] mb-lg">{children}</div>

      {!removeSubFooter && (
        <>
          <div className="mb-lg px-[17.5rem]">
            <ProductThumbnails />
          </div>

          <SubFooter />
        </>
      )}
      <Footer />
    </>
  );
};

export default ProductDetailsLayout;
