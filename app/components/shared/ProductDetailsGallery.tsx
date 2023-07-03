import Image from "next/image";
import type { Product } from "@/Types/data-fetching";

interface Props {
  productDetail: Product;
}

function ProductDetailsGallery({ productDetail }: Props) {
  return (
    <div className="flex gap-[30px] w-full">
      <div className="flex flex-col gap-[32px] w-[35%] relative">
        <Image
          src={productDetail.galleryOne.publicUrl}
          alt="Image Gallery"
          width={455}
          height={280}
          className="rounded-lg object-cover"
        />

        <Image
          src={productDetail.galleryTwo.publicUrl}
          alt="Image Gallery"
          width={455}
          height={280}
          className="rounded-lg"
          objectFit="cover"
        />
      </div>

      <div className="w-[65%] relative">
        <Image
          src={productDetail.galleryThree.publicUrl}
          alt="Image Gallery"
          width={635}
          height={592}
          className="rounded-lg"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

export default ProductDetailsGallery;
