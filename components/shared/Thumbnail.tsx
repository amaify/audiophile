import Image, { type StaticImageData } from "next/image";
import Button from "./Button";

interface Props {
  title: string;
  img: StaticImageData;
  onClick?: () => void;
}

const Thumbnail = ({ title, img, onClick }: Props) => {
  return (
    <div className="bg-darkGrey w-full h-[20.4rem] relative rounded-lg sm:h-[16.5rem] md:w-1/3 lg:h-[20.4rem]">
      <div className="absolute -bottom-[2.5rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] h-auto sm:w-[16rem] sm:bottom-0 lg:w-[22rem] lg:-bottom-[1.25rem]">
        <Image src={img} alt={title} className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <h6 className="[ heading-6 ] font-bold">{title}</h6>
        <Button to={`/${title}`} btnText="shop" btnType={3} onClick={onClick} />
      </div>
    </div>
  );
};

export default Thumbnail;
