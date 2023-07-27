import React from "react";
import Image, { StaticImageData } from "next/image";
import Button from "./Button";

interface Props {
  thumbnailTitle: string;
  thumbnailImage: StaticImageData;
}

const Thumbnail = ({ thumbnailTitle, thumbnailImage }: Props) => {
  return (
    <div className="bg-darkGrey w-[33%] h-[204px] relative rounded-[8px]">
      <div className="absolute -bottom-[20px] left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image
          src={thumbnailImage}
          alt={`${thumbnailTitle}`}
          width={200}
          height={200}
          layout="fixed"
          objectFit="contain"
        />
      </div>
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h6 className="[ heading-6 ] font-bold">{thumbnailTitle}</h6>
        <Button to={thumbnailTitle} btnText="shop" btnType={3} />
      </div>
    </div>
  );
};

export default Thumbnail;
