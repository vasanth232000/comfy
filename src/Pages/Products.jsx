import React from "react";
import { Filters, PaginatorContainer, ProductsContainer } from "../Components";
import { customFetch } from "../utils";

const url = "/products";

export const loader = async ({ request }) => {
  const response = await customFetch(url);
  const data = response.data.data;
  const meta = response.data.meta;
  return { data, meta };
};

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginatorContainer />
    </>
  );
};

export default Products;
