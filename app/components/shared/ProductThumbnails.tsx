import React from "react";
import Thumbnail from "./Thumbnail";
import HeadphoneImage from "../../assets/shared/desktop/image-category-thumbnail-headphones.png";
import SpeakerImage from "../../assets/shared/desktop/image-category-thumbnail-speakers.png";
import EarphonesImage from "../../assets/shared/desktop/image-category-thumbnail-earphones.png";

const ProductThumbnails = () => {
  return (
    <section className="flex gap-[3rem]">
      <Thumbnail thumbnailTitle="headphones" thumbnailImage={HeadphoneImage} />
      <Thumbnail thumbnailTitle="speakers" thumbnailImage={SpeakerImage} />
      <Thumbnail thumbnailTitle="earphones" thumbnailImage={EarphonesImage} />
    </section>
  );
};

export default ProductThumbnails;
