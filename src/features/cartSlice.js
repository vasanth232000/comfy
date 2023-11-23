import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      if (state.cartItems.length === 0) {
        state.cartItems.push(item);
        cartSlice.caseReducers.calculateTotals(state);
        return;
      }
      let isItemExist = state.cartItems.find(
        (product) => product.cartId === item.cartId
      );
      if (isItemExist) {
        isItemExist.amount = item.amount;
      } else {
        state.cartItems.push(item);
      }
      cartSlice.caseReducers.calculateTotals(state);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const newItems = state.cartItems.filter((item) => item.cartId !== id);
      state.cartItems = newItems;
      cartSlice.caseReducers.calculateTotals(state);
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    editItem: (state, action) => {
      const id = action.payload.cartId;
      const amount = action.payload.amount;
      const currItem = state.cartItems.find((product) => product.cartId === id);
      currItem.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.map((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.numItemsInCart = amount;
      state.cartTotal = total;
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});
export const { addItem, removeItem, clearCart, editItem } = cartSlice.actions;
export default cartSlice.reducer;
