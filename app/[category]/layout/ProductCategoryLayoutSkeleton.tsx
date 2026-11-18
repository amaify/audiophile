import Skeleton from "@/components/shared/Skeleton";
import NavigationLayout from "@/components/layout/NavigationLayout";
import SubFooter from "@/components/shared/SubFooter";
import Footer from "@/components/shared/Footer";
import ProductThumbnails from "../components/ProductThumbnails";

function ProductCategorySkeleton() {
  return (
    <div className="flex flex-col gap-[3.2rem] md:flex-row md:even:flex-row-reverse md:gap-50">
      <Skeleton className="w-full rounded-lg h-[35.2rem] md:h-[40.2rem] md:w-216 xl:h-auto xl:aspect-540/560 2xl:w-1/2" />

      <div className="w-full self-center flex flex-col items-center md:items-start md:w-178 2xl:w-1/2">
        <Skeleton className="h-[1.4rem] w-48 mb-4" />

        <div className="flex flex-col items-center gap-4 w-full mb-[2.4rem] md:items-start md:mb-[3.2rem]">
          <Skeleton className="h-[2.8rem] w-4/5 lg:h-16" />
          <Skeleton className="h-[2.8rem] w-1/2 lg:h-16" />
        </div>

        {/* Description */}
        <div className="flex flex-col items-center gap-4 w-full mb-10 md:items-start">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/5" />
        </div>

        {/* "See product" button */}
        <Skeleton className="w-64 h-[4.8rem] lg:w-[16.8rem] lg:h-16" />
      </div>
    </div>
  );
}

interface Props {
  layoutTitle: string;
  itemCount?: number;
}

export default function ProductCategoryLayoutSkeleton({ layoutTitle, itemCount = 3 }: Props) {
  return (
    <>
      <div className="bg-black relative xl:before:full-bleed xl:before:bg-black">
        <NavigationLayout />
        <div className="py-[3.2rem] w-full text-center md:py-[9.8rem]">
          <h2 className="heading-2 text-white">{layoutTitle}</h2>
        </div>
      </div>

      <section className="flex flex-col gap-64 layout-padding">
        <div className="pt-[6.4rem] pb-0 md:pt-64 lg:pb-28" role="status" aria-busy="true" aria-live="polite">
          <span className="sr-only">Loading {layoutTitle}…</span>

          <div className="w-full flex flex-col gap-48 md:gap-64">
            {Array.from({ length: itemCount }, (_, idx) => (
              <ProductCategorySkeleton key={idx} />
            ))}
          </div>
        </div>

        <ProductThumbnails />
        <SubFooter />
      </section>

      <Footer />
    </>
  );
}
