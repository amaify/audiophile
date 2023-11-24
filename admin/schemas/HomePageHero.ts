import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import type { Lists } from ".keystone/types";
import { select, text } from "@keystone-6/core/fields";
import { cloudinaryImage } from "@keystone-6/cloudinary";

export const productCategoryOptions = [
  { label: "Headphones", value: "headphones" },
  { label: "Speakers", value: "speakers" },
  { label: "Earphones", value: "earphones" },
];

export const HomePageHero: ListConfig<Lists.HomePageHero.TypeInfo, any> = list({
  access: allowAll,
  fields: {
    heroTitle: text({ validation: { isRequired: true } }),
    heroCategory: select({
      options: productCategoryOptions,
      validation: { isRequired: true },
    }),
    heroDescription: text({
      validation: { isRequired: true },
    }),
    heroModbileImage: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER_HERO,
      },
    }),
    heroTabletImage: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER_HERO,
      },
    }),
    heroDesktopImage: cloudinaryImage({
      cloudinary: {
        apiKey: process.env.CLOUDINARY_API_KEY ?? "",
        apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
        folder: process.env.CLOUDINARY_API_FOLDER_HERO,
      },
    }),
  },
});
