import React, { useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading } from "../Components";
import Navbar from "../Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { calaculateTotals } from "../features/cartSlice";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const { cartItems } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calaculateTotals());
  }, [cartItems]);
  return (
    <>
      <Header />
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default HomeLayout;
