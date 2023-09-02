import React from "react";
import Thumbnail from "./Thumbnail";
import HeadphoneImage from "../../assets/shared/desktop/image-category-thumbnail-headphones.png";
import SpeakerImage from "../../assets/shared/desktop/image-category-thumbnail-speakers.png";
import EarphonesImage from "../../assets/shared/desktop/image-category-thumbnail-earphones.png";

interface Props {
  onClick?: () => void;
}

const productThumbnail = [
  { title: "headphones", img: HeadphoneImage },
  { title: "speakers", img: SpeakerImage },
  { title: "earphones", img: EarphonesImage }
];

const ProductThumbnails = ({ onClick }: Props) => {
  return (
    <section className="flex w-full flex-col gap-[9rem] sm:flex-row sm:gap-[1rem] md:gap-[3rem]">
      {productThumbnail.map((product) => (
        <Thumbnail key={product.title} title={product.title} img={product.img} onClick={onClick} />
      ))}
    </section>
  );
};

export default ProductThumbnails;
