import React from "react";
import { Hero, FeaturedProducts } from "../Components";
import { customFetch } from "../utils";

const url = "/products?featured=true";

const featuredData = {
  queryKey: ["featured"],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredData);
  const data = response.data.data;
  return { data };
};

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  );
};

export default Landing;
