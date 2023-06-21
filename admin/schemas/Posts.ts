import { list, ListConfig } from "@keystone-6/core";
import { text, relationship, timestamp, select } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";
import { allowAll } from "@keystone-6/core/access";

export const Post: ListConfig<Lists.Post.TypeInfo, any> = list({
  access: allowAll,
  fields: {
    title: text(),
    status: select({
      options: [
        { label: "Published", value: "published" },
        { label: "Draft", value: "draft" }
      ],
      defaultValue: "draft",
      ui: {
        displayMode: "segmented-control"
      }
    }),
    content: document({
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
    publishDate: timestamp(),
    author: relationship({
      ref: "User.posts",
      ui: {
        displayMode: "cards",
        cardFields: ["name", "email"],
        inlineEdit: { fields: ["name", "email"] },
        linkToItem: true,
        inlineConnect: true
      }
    })
  }
});
