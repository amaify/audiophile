import Image from "next/image";
import type { Product } from "@/Types/sharedTypes";

function ProductDetailsGallery({ productDetail }: { productDetail: Product }) {
  return (
    <div className="flex flex-col gap-[1.6rem] w-full md:gap-[3rem] md:flex-row">
      <div className="flex flex-col gap-[1.6rem] w-full relative md:w-[35%] md:gap-[3.6rem]">
        <Image
          src={productDetail.productGalleryImage1.secure_url}
          alt="Image Gallery"
          width={455}
          height={280}
          className="rounded-lg object-cover w-full h-full"
        />

        <Image
          src={productDetail.productGalleryImage2.secure_url}
          alt="Image Gallery"
          width={455}
          height={280}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>

      <div className="w-full h-[36.8rem] relative md:w-[65%] md:h-auto">
        <Image
          src={productDetail.productGalleryImage3.secure_url}
          alt="Image Gallery"
          width={635}
          height={592}
          className="rounded-lg object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

export default ProductDetailsGallery;
