import Skeleton from "../../../components/shared/Skeleton";

export default function ProductCategoryLayoutSkeleton() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      <Skeleton className="w-full h-[35rem] mb-[16rem]" />

      <div className="flex flex-col gap-[16rem]">
        {Array.from({ length: 3 }, (_, idx) => (
          <div key={idx} className="flex items-center justify-center gap-[12.5rem] even:flex-row-reverse">
            <Skeleton className="w-[54rem] h-[56rem]" />
            <Skeleton className="w-[44.5rem] h-[34.3rem]" />
          </div>
        ))}
      </div>
    </div>
  );
}
