import React from "react";
import dynamic from "next/dynamic";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";
import { useRouter } from "next/router";

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
      <div className="px-[17.5rem] my-[250px]">{children}</div>
      <section className="mb-lg px-[17.5rem]">
        <ProductThumbnails />
      </section>

      <SubFooter />
      <Footer />
    </>
  );
};

export default ProductCategoryLayout;
