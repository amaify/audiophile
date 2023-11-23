import { ListConfig, list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import type { Lists } from ".keystone/types";

export const Hero: ListConfig<Lists.Hero.TypeInfo, any> = list({
  access: allowAll,
  fields: {},
});
