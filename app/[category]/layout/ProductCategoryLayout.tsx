import React from "react";
import Footer from "@/components/shared/Footer";
import SubFooter from "@/components/shared/SubFooter";
import { Category } from "@/app/[category]/page";
import ProductThumbnails from "@/app/[category]/components/ProductThumbnails";
import NavigationLayout from "@/components/layout/NavigationLayout";

interface Props {
  children: React.ReactNode;
  layoutTitle: Category;
}

const ProductCategoryLayout = ({ children, layoutTitle }: Props) => {
  return (
    <>
      <div className="bg-black relative xl:before:full-bleed xl:before:bg-black">
        <NavigationLayout />
        <div className="py-[3.2rem] w-full text-center md:py-[9.8rem]">
          <h2 className="heading-2 text-white">{layoutTitle}</h2>
        </div>
      </div>

      <section className="flex flex-col gap-64 layout-padding">
        <div className="pt-[6.4rem] pb-0 md:pt-64 lg:pb-28">{children}</div>
        <ProductThumbnails />
        <SubFooter />
      </section>

      <Footer />
    </>
  );
};

export default ProductCategoryLayout;
