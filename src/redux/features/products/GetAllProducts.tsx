import { baseApi } from "../../api/baseApi";

const getAllProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    getAllSortedProduct: builder.query({
      query: (sortQuery) => ({
        url: `/products?sort=${sortQuery}`,
        method: "GET",
      }),
    }),

    getSearchedProduct: builder.query({
      query: (searchQuery) => ({
        url: `/products?searchTerm=${searchQuery}`,
        method: "GET",
      }),
    }),





  }),
});

export const { useGetAllProductQuery,useGetAllSortedProductQuery,useGetSearchedProductQuery } = getAllProductApi;
