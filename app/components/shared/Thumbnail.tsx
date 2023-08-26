import React from "react";
import Image, { StaticImageData } from "next/image";
import Button from "./Button";

interface Props {
  title: string;
  img: StaticImageData;
}

const Thumbnail = ({ title, img }: Props) => {
  return (
    <div className="bg-darkGrey w-full h-[20.4rem] relative rounded-lg md:w-1/3">
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image src={img} alt={title} className="w-[20rem] h-[20rem] object-contain" />
      </div>
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h6 className="[ heading-6 ] font-bold">{title}</h6>
        <Button to={`/${title}`} btnText="shop" btnType={3} />
      </div>
    </div>
  );
};

export default Thumbnail;
