import React from "react";
import dynamic from "next/dynamic";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";
import SubPageHeader from "../shared/SubPageHeader";

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

      <SubPageHeader />

      <div className="px-[17.5rem]">
        <div className="mt-[7.9rem] mb-[16rem]">{children}</div>

        {!removeSubFooter && (
          <>
            <div className="mb-[16rem]">
              <ProductThumbnails />
            </div>

            <SubFooter />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsLayout;
