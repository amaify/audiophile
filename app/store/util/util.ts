import { CartItem } from "../Types/Cart";

export const sumAllPrice = (cart: CartItem[]) => {
	const sum = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

	return sum;
};
