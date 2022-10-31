export type CartItem = {
	id: number;
	title: string;
	itemCount: number;
	price: number;
	totalPrice: number;
};

export type Cart = {
	cart: CartItem[];
	total: number;
};
