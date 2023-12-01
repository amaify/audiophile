import React, { type ReactNode } from "react";
import dynamic from "next/dynamic";
import Footer from "../shared/Footer";
import SubFooter from "../shared/SubFooter";
import BackButton from "../shared/BackButton";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });
const ProductThumbnails = dynamic(import("@/components//shared/ProductThumbnails"), { ssr: false });
const SubPageHeader = dynamic(import("@/components/layout/SubPageHeader"), { ssr: false });

interface Props {
  children: ReactNode;
  pageTitle: string;
  removeSubFooter: boolean;
  onClick: () => void;
}

const ProductDetailsLayout = ({ children, pageTitle, removeSubFooter, onClick }: Props) => {
  return (
    <>
      <Meta pageTitle={pageTitle} />
      <SubPageHeader />

      <div className="[ layout-padding ]">
        <div className="mt-[1.6rem] mb-[16rem] lg:mt-[7.9rem]">
          <BackButton onClick={onClick} />
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
