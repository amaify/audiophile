import SubPageHeader from "@/components/layout/SubPageHeader";
import BackButton from "@/components/shared/BackButton";
import React, { type ReactNode } from "react";
import SubFooter from "@/components/shared/SubFooter";
import Footer from "@/components/shared/Footer";
import ProductThumbnails from "../components/ProductThumbnails";

interface Props {
  children: ReactNode;
  removeSubFooter: boolean;
  onClick: () => void;
}

const ProductDetailsLayout = ({ children, removeSubFooter, onClick }: Props) => {
  return (
    <>
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
