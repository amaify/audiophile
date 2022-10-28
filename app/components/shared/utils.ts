interface NavigationLInks {
	name: string;
	slug: string;
}

export const navLinks: NavigationLInks[] = [
	{ name: "home", slug: "/" },
	{ name: "headphones", slug: "/headphones" },
	{ name: "speakers", slug: "/speakers" },
	{ name: "earphones", slug: "/earphones" },
];

export const formatPrice = (productPrice: any) =>
	new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	}).format(productPrice);

export const itemPriceSum = (cartItems: any) =>
	cartItems.reduce((acc: any, curr: any) => acc + curr.price, 0);
