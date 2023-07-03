import { list, ListConfig } from "@keystone-6/core";
import { text, checkbox, float, select, json } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { allowAll } from "@keystone-6/core/access";
import { cloudinaryImage } from "@keystone-6/cloudinary";
import dotenv from "dotenv";
import type { Lists } from ".keystone/types";

dotenv.config();

export const Product: ListConfig<Lists.Product.TypeInfo, any> = list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true } }),
    newProduct: checkbox(),
    cartTitle: text({
      validation: { isRequired: true },
      ui: { description: "Enter a short title of not more than 10 characters" },
    }),
    suggestionTitle: text({
      validation: { isRequired: true },
      ui: { description: "Enter a short suggestion title" },
    }),
    slug: text({
      validation: { isRequired: true },
    }),
    // previewImage: image({ storage: "product_images" }),
    previewImage: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
    // cartImage: image({ storage: "product_images" }),
    cartImage: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
    category: select({
      options: [
        { label: "Headphones", value: "headphones" },
        { label: "Speakers", value: "speakers" },
        { label: "Earphones", value: "earphones" },
      ],
      validation: { isRequired: true },
    }),
    description: text({
      validation: { isRequired: true },
      ui: { displayMode: "textarea" },
    }),
    price: float({ defaultValue: 0.0, validation: { isRequired: true } }),
    features: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1],
      ],
      links: true,
      dividers: true,
    }),
    boxContent: json(),
    galleryOne: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
    galleryTwo: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
    galleryThree: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER,
      },
    }),
  },
  ui: {
    listView: {
      initialColumns: ["title", "previewImage", "price"],
    },
  },
});
