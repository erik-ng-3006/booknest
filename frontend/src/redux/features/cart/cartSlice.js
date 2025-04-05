import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
	cartItems: [],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.cartItems.find(
				(item) => item._id === action.payload._id
			);
			if (!existingItem) {
				state.cartItems.push(action.payload);
				toast.success('Item added to cart');
			} else {
				toast.error('Item already in cart');
			}
		},
		removeFromCart: (state, action) => {
			state.cart = state.cartItems.filter(
				(item) => item._id !== action.payload._id
			);
		},
		clearCart: (state) => {
			state.cartItems = [];
		},
	},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
