import Skeleton from "@/components/shared/Skeleton";
import SubPageHeader from "@/components/layout/SubPageHeader";
import SubFooter from "@/components/shared/SubFooter";
import Footer from "@/components/shared/Footer";
import ProductThumbnails from "../components/ProductThumbnails";

/** Stacked bars standing in for a paragraph; the last line is shorter. */
function TextLines({ lines, className }: { lines: number; className?: string }) {
  return (
    <div className={className}>
      {Array.from({ length: lines }, (_, idx) => (
        <Skeleton key={idx} className={idx === lines - 1 ? "h-6 w-3/5" : "h-6 w-full"} />
      ))}
    </div>
  );
}

/** Mirrors the product hero in app/[category]/[slug]/PageComponent.tsx */
function ProductHeroSkeleton() {
  return (
    <div className="flex flex-col gap-[3.2rem] mb-[8.8rem] sm:flex-row sm:gap-[6.95rem] md:mb-64 md:gap-50">
      <Skeleton className="w-full rounded-lg h-[32.7rem] sm:w-[28.1rem] sm:h-192 lg:w-1/2 lg:h-auto lg:aspect-540/560" />

      <div className="w-full self-center sm:w-[33.9rem] md:w-1/2">
        <Skeleton className="h-[1.4rem] w-48 mb-[1.6rem]" />
        <div className="flex flex-col gap-4 mb-[2.4rem] md:mb-[3.2rem]">
          <Skeleton className="h-[2.8rem] w-4/5 lg:h-16" />
          <Skeleton className="h-[2.8rem] w-1/2 lg:h-16" />
        </div>
        <TextLines lines={4} className="flex flex-col gap-4 mb-[2.4rem] md:mb-[3.2rem]" />
        <Skeleton className="h-[1.8rem] w-40 mb-[3.1rem] md:mb-[4.7rem]" />
        <div className="flex gap-[1.6rem]">
          <Skeleton className="w-48 h-[4.8rem]" />
          <Skeleton className="w-[16rem] h-[4.8rem] lg:w-[16.8rem]" />
        </div>
      </div>
    </div>
  );
}

/** Mirrors app/[category]/components/ProductFeature.tsx */
function ProductFeatureSkeleton() {
  return (
    <div className="flex flex-col gap-[8.8rem] mb-[8.8rem] md:mb-64 md:gap-50 md:flex-row">
      <div className="w-full md:w-1/2">
        <Skeleton className="h-[2.4rem] w-[16rem] mb-[2.4rem] md:mb-[3.2rem] lg:h-[3.2rem]" />
        <TextLines lines={5} className="flex flex-col gap-4 mb-[2.4rem]" />
        <TextLines lines={4} className="flex flex-col gap-4" />
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-[1.1rem] md:flex-col md:gap-0 md:w-140">
        <Skeleton className="h-[2.4rem] w-[18rem] mb-[3.2rem] sm:w-[33.9rem] md:w-[18rem] lg:h-[3.2rem]" />
        <ul className="flex flex-col gap-[1.6rem] w-full">
          {Array.from({ length: 5 }, (_, idx) => (
            <li key={idx} className="flex items-center gap-[2.1rem]">
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-6 w-60" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mirrors app/[category]/components/ProductDetailsGallery.tsx */
function ProductGallerySkeleton() {
  return (
    <div className="flex flex-col gap-[1.6rem] w-full md:gap-12 md:flex-row">
      <div className="flex flex-col gap-[1.6rem] w-full md:w-[35%] md:gap-[3.6rem]">
        <Skeleton className="w-full rounded-lg aspect-455/280" />
        <Skeleton className="w-full rounded-lg aspect-455/280" />
      </div>
      <Skeleton className="w-full rounded-lg h-[36.8rem] md:w-[65%] md:h-auto md:aspect-635/592" />
    </div>
  );
}

export default function ProductDetailsLayoutSkeleton() {
  return (
    <>
      <SubPageHeader />

      <div className="layout-padding" role="status" aria-busy="true" aria-live="polite">
        <span className="sr-only">Loading product details…</span>

        <div className="mt-[1.6rem] mb-64 lg:mt-[7.9rem]">
          <Skeleton className="h-10 w-[6.4rem] mb-[2.4rem] lg:mb-[5.6rem]" />

          <ProductHeroSkeleton />
          <ProductFeatureSkeleton />
          <ProductGallerySkeleton />
        </div>

        <div className="flex flex-col gap-64">
          <ProductThumbnails />
          <SubFooter />
        </div>
      </div>

      <Footer />
    </>
  );
}
