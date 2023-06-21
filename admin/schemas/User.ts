import { list, ListConfig } from "@keystone-6/core";
import { text, relationship, password, timestamp } from "@keystone-6/core/fields";
import { Lists } from ".keystone/types";
import { allowAll } from "@keystone-6/core/access";

export const User: ListConfig<Lists.User.TypeInfo, any> = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: "unique",
      isFilterable: true
    }),
    // The password field takes care of hiding details and hashing values
    password: password({ validation: { isRequired: true } }),
    posts: relationship({ ref: "Post.author", many: true }),
    createdAt: timestamp({
      defaultValue: { kind: "now" }
    })
  },
  ui: {
    listView: {
      initialColumns: ["name", "posts"]
    }
  }
});
