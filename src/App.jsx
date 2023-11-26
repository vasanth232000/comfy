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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: LandingLoader(queryClient),
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
        loader: ProductsLoader(queryClient),
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
        loader: SinglePageLoader(queryClient),
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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
