import React from "react";
import {
  About,
  Cart,
  Checkout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Orders,
  Products,
  Register,
  SingleProduct,
} from "./Pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as LandingLoader } from "./Pages/Landing";
import { loader as SinglePageLoader } from "./Pages/SingleProduct";
import { loader as ProductsLoader } from "./Pages/Products";
import { action as RegisterAction } from "./Pages/Register";
import { action as LoginAction } from "./Pages/Login";
import { action as CheckoutAction } from "./Pages/Checkout";
import { loader as CheckoutLoader } from "./Pages/Checkout";
import { loader as OrderLoader } from "./Pages/Orders";
import { store } from "./Store";
import ErrorElement from "./Components/ErrorElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: LandingLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        loader: CheckoutLoader(store),
        action: CheckoutAction(store),
      },
      {
        path: "/orders",
        element: <Orders />,
        loader: OrderLoader(store),
      },
      {
        path: "/products",
        element: <Products />,
        loader: ProductsLoader,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: SinglePageLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
    action: RegisterAction,
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
