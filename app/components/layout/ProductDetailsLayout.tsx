import React, { type ReactNode } from "react";
import dynamic from "next/dynamic";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";
import SubPageHeader from "./SubPageHeader";
import BackButton from "../shared/BackButton";

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

      <div className="[ layout-padding ]">
        <div className="mt-[1.6rem] mb-[16rem] lg:mt-[7.9rem]">
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
