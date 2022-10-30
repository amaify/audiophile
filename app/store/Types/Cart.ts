export type CartItem = {
	title: string;
	itemCount: number;
	price: number;
	totalPrice: number;
};

export type Cart = {
	cart: CartItem[];
	total: number;
};
