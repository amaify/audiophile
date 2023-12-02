import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Footer from "@/components/shared/Footer";
import SubFooter from "@/components/shared/SubFooter";

const Meta = dynamic(import("@/components/shared/Meta"), { ssr: false });
const NavigationLayout = dynamic(import("./NavigationLayout"), { ssr: false });
const ProductThumbnails = dynamic(import("@/components/shared/ProductThumbnails"), { ssr: false });

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
      <div className="bg-black h-[25rem] relative [ product-category-header layout-padding ] md:h-[33.6rem]">
        <NavigationLayout />
        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
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
