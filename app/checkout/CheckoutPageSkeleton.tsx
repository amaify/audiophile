import Skeleton from "@/components/shared/Skeleton";

export default function CheckoutPageSkeleton() {
  return (
    <div className="flex items-center justify-center gap-[3rem]">
      <Skeleton className="w-[70%] h-[75rem] mb-[16rem]" />
      <Skeleton className="w-[30%] h-[30rem] mb-[16rem]" />
    </div>
  );
}
