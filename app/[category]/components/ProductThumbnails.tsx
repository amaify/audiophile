import HeadphoneImage from "@/public/shared/desktop/image-category-thumbnail-headphones.png";
import SpeakerImage from "@/public/shared/desktop/image-category-thumbnail-speakers.png";
import EarphonesImage from "@/public/shared/desktop/image-category-thumbnail-earphones.png";
import Thumbnail from "@/components/shared/Thumbnail";

const productThumbnail = [
  { title: "headphones", img: HeadphoneImage },
  { title: "speakers", img: SpeakerImage },
  { title: "earphones", img: EarphonesImage }
];

const ProductThumbnails = ({ onClick }: { onClick?: () => void }) => {
  return (
    <section className="flex w-full flex-col gap-[9rem] sm:flex-row sm:gap-[1rem] md:gap-[3rem]">
      {productThumbnail.map((product) => (
        <Thumbnail key={product.title} title={product.title} img={product.img} onClick={onClick} />
      ))}
    </section>
  );
};

export default ProductThumbnails;
