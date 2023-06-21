import { list, ListConfig } from "@keystone-6/core";
import { text, relationship, timestamp, bigInt, checkbox, float, select, json, image } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { allowAll } from "@keystone-6/core/access";
import type { Lists } from ".keystone/types";

export const Product: ListConfig<Lists.Product.TypeInfo, any> = list({
  access: allowAll,
  fields: {
    title: text({ validation: { isRequired: true } }),
    newProduct: checkbox(),
    cartTitle: text({
      validation: { isRequired: true },
      ui: { description: "Enter a short title of not more than 10 characters" }
    }),
    suggestionTitle: text({
      validation: { isRequired: true },
      ui: { description: "Enter a short suggestion title" }
    }),
    slug: text({
      validation: { isRequired: true }
    }),
    previewImage: image({ storage: "product_images" }),
    cartImage: image({ storage: "product_images" }),
    category: select({
      options: [
        { label: "Headphones", value: "headphones" },
        { label: "Speakers", value: "speakers" },
        { label: "Earphones", value: "earphones" }
      ]
    }),
    description: text({
      validation: { isRequired: true },
      ui: { displayMode: "textarea" }
    }),
    price: float({ defaultValue: 0.0, validation: { isRequired: true } }),
    features: document({
      formatting: true,
      layouts: [
        [1, 1],
        [1, 1, 1],
        [2, 1],
        [1, 2],
        [1, 2, 1]
      ],
      links: true,
      dividers: true
    }),
    boxContent: json(),
    gallery: json()
  },
  ui: {
    listView: {
      initialColumns: ["title", "previewImage", "price"]
    }
  }
});
