import React from "react";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import type { Product } from "@/Types/data-fetching";

interface Props {
  productDetail: Product;
}

const productFeature = ({ productDetail }: Props) => {
  return (
    <div className="flex gap-[125px] mb-lg">
      <div className="w-[50.5%]">
        <h3 className="[ heading-3 ] mb-[32px]">features</h3>
        <div className="[ body-text ] [ product-feature ] text-black opacity-50">
          <DocumentRenderer document={productDetail.features.document} />
        </div>
      </div>

      <div>
        <h3 className="[ heading-3 ] mb-[32px]">in the box</h3>
        <ul>
          {productDetail.boxContent.map((boxContent) => (
            <li className="[ body-text ] mb-[8px] text-black" key={boxContent.content}>
              <span className="text-primary font-bold mr-[21px] opacity-100">{boxContent.quantity}</span>
              <span className="opacity-50 capitalize">{boxContent.content}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default productFeature;
