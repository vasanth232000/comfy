import React, { useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import { Header, Loading } from "../Components";
import Navbar from "../Components/Navbar";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
