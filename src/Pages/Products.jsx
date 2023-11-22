import React from "react";
import { Filters, PaginatorContainer, ProductsContainer } from "../Components";
import { customFetch } from "../utils";

const url = "/products";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  console.log(params);
  const response = await customFetch(url, {
    params,
  });
  const data = response.data.data;
  const meta = response.data.meta;
  return { data, meta, params };
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
