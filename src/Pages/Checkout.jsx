import { useSelector } from "react-redux";
import { CheckoutForm, SectionTitle, CartTotals } from "../Components";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch, formatPrice } from "../utils";
import { clearCart } from "../features/cartSlice";

export const loader = (store) => async () => {
  const { user } = store.getState().user;
  console.log(user.token);
  if (!user) {
    toast.warn("You must be logged in to checkout");
    return redirect("/login");
  }
  return null;
};

export const action =
  (store) =>
  async ({ request }) => {
    const formdata = await request.formData();
    const { name, address } = Object.fromEntries(formdata);
    const { user } = store.getState().user;
    const { cartItems, cartTotal, numItemsInCart } = store.getState().cart;
    const config = {
      headers: { Authorization: `Bearer ${user.token}` },
    };
    const orderData = {
      data: {
        address,
        cartItems,
        chargeTotal: cartTotal,
        name,
        numItemsInCart,
        orderTotal: formatPrice(cartTotal),
      },
    };
    try {
      const response = await customFetch.post("/orders", orderData, config);
      store.dispatch(clearCart());
      toast.success("order placed successfully");
      return redirect("/orders");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "there was an error placing your order";

      toast.error(errorMessage);
      if (error.response.status === 401 || 403) return redirect("/login");
      return null;
    }
  };

const Checkout = () => {
  const { cartItems } = useSelector((store) => store.cart);
  if (cartItems.length === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }
  return (
    <>
      <SectionTitle text="Place your order" />
      <div className="mt-8 grid gap-8  md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  );
};
export default Checkout;
