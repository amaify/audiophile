import React from "react";
import Thumbnail from "./Thumbnail";
import HeadphoneImage from "../../assets/shared/desktop/image-category-thumbnail-headphones.png";
import SpeakerImage from "../../assets/shared/desktop/image-category-thumbnail-speakers.png";
import EarphonesImage from "../../assets/shared/desktop/image-category-thumbnail-earphones.png";

const ProductThumbnails = () => {
	return (
		<div className="flex gap-[30px]">
			<Thumbnail thumbnailTitle="headphones" thumbnailImage={HeadphoneImage} />
			<Thumbnail thumbnailTitle="speakers" thumbnailImage={SpeakerImage} />
			<Thumbnail thumbnailTitle="earphones" thumbnailImage={EarphonesImage} />
		</div>
	);
};

export default ProductThumbnails;
