import { list, ListConfig } from "@keystone-6/core";
import {
	text,
	relationship,
	timestamp,
	bigInt,
	float,
	select,
	json,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { Lists } from ".keystone/types";

export const Product: ListConfig<Lists.Product.TypeInfo, any> = list({
	fields: {
		title: text({ validation: { isRequired: true } }),
		slug: text({ validation: { isRequired: true } }),
		category: select({
			options: [
				{ label: "Headphones", value: "headphones" },
				{ label: "Speakers", value: "speakers" },
				{ label: "Earphones", value: "earphones" },
			],
		}),
		description: text({ validation: { isRequired: true } }),
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
	},
});
