import type { ReactNode } from "react";
import NavigationLayout from "./NavigationLayout";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";
import Footer from "../shared/Footer";

export default function ErrorBoundaryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="bg-black h-[25rem] relative [ product-category-header layout-padding ] md:h-[33.6rem]">
        <NavigationLayout />
      </div>

      <section className="flex flex-col gap-[16rem] [ layout-padding ]">
        <div className="pt-[6.4rem] pb-0 md:pt-[16rem] lg:pb-[7rem]">{children}</div>
        <ProductThumbnails />
        <SubFooter />
      </section>

      <Footer />
    </>
  );
}
