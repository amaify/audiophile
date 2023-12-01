import { DocumentRenderer } from "@keystone-6/document-renderer";
import type { Product } from "@/Types/shared-types";

interface Props {
  productDetail: Product;
}

const productFeature = ({ productDetail }: Props) => {
  return (
    <div className="flex flex-col gap-[8.8rem] mb-[8.8rem] md:mb-lg md:gap-[12.5rem] md:flex-row">
      <div className="w-full md:w-1/2">
        <h3 className="[ heading-3 ] mb-[2.4rem] md:mb-[3.2rem]">features</h3>
        <div className="[ body-text ] [ product-feature ] text-black opacity-50">
          <DocumentRenderer document={productDetail.features.document} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:gap-[1.1rem] md:flex-col md:gap-0">
        <h3 className="[ heading-3 ] mb-[3.2rem] w-full sm:w-[33.9rem] md:w-full">in the box</h3>
        <ul>
          {productDetail.boxContent.map((boxContent) => (
            <li className="[ body-text ] mb-[.8rem] text-black" key={boxContent.content}>
              <span className="text-primary font-bold mr-[2.1rem] opacity-100">{boxContent.quantity}</span>
              <span className="opacity-50 capitalize">{boxContent.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default productFeature;
