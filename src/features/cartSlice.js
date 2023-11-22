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

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      if (state.cartItems.length === 0) {
        state.cartItems.push(item);
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
    },
    removeItem: (state, action) => {
      const id = action.payload;
      const newItems = state.cartItems.filter((item) => item.cartId !== id);
      state.cartItems = newItems;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    editItem: (state, action) => {
      console.log("edit");
    },
    calaculateTotals: (state) => {
      let amount = 0;
      state.cartItems.map((item) => {
        amount += item.amount;
      });
      state.numItemsInCart = amount;
    },
  },
});
export const { addItem, removeItem, clearCart, editItem, calaculateTotals } =
  cartSlice.actions;
export default cartSlice.reducer;
