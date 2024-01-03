import React from "react";
import Footer from "@/components/shared/Footer";
import SubFooter from "@/components/shared/SubFooter";
import { Category } from "@/app/[category]/page";
import NavigationLayout from "@/components/layout/NavigationLayout";
import ProductThumbnails from "@/app/[category]/components/ProductThumbnails";

interface Props {
  children: React.ReactNode;
  layoutTitle: Category;
}

const ProductCategoryLayout = ({ children, layoutTitle }: Props) => {
  return (
    <>
      <div className="bg-black relative [ product-category-header layout-padding ]">
        <NavigationLayout />
        <div className="py-[3.2rem] w-full text-center md:py-[9.8rem]">
          <h2 className="[ heading-2 ] text-white">{layoutTitle}</h2>
        </div>
      </div>

      <section className="flex flex-col gap-[16rem] [ layout-padding ]">
        <div className="pt-[6.4rem] pb-0 md:pt-[16rem] lg:pb-[7rem]">{children}</div>
        <ProductThumbnails />
        <SubFooter />
      </section>

      <Footer />
    </>
  );
};

export default ProductCategoryLayout;
