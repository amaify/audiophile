import React, { type ReactNode } from "react";
import dynamic from "next/dynamic";
import Footer from "../components/shared/Footer";
import ProductThumbnails from "../components/shared/ProductThumbnails";
import SubFooter from "../components/shared/SubFooter";
import SubPageHeader from "../components/layout/SubPageHeader";
import BackButton from "../components/shared/BackButton";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });

interface Props {
  children: ReactNode;
  pageTitle: string;
  removeSubFooter: boolean;
}

const ProductDetailsLayout = ({ children, pageTitle, removeSubFooter }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <SubPageHeader />

      <div className="px-[2.4rem] sm:px-[4rem] md:px-[17.5rem]">
        <div className="mt-[1.6rem] mb-[16rem] md:mt-[7.9rem]">
          <BackButton />
          {children}
        </div>

        {!removeSubFooter && (
          <div className="flex flex-col gap-[16rem]">
            <ProductThumbnails />
            <SubFooter />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsLayout;
