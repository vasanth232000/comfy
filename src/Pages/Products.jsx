import React from "react";
import { Filters, PaginatorContainer, ProductsContainer } from "../Components";
import { customFetch } from "../utils";

const url = "/products";

const getProducts = (params) => {
  const { search, category, company, sort, price, shipping, page } = params;
  return {
    queryKey: [
      "products",
      search ?? "",
      category ?? "all",
      company ?? "all",
      sort ?? "a-z",
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () => customFetch(url, { params: params }),
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    const response = await queryClient.ensureQueryData(getProducts(params));
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
