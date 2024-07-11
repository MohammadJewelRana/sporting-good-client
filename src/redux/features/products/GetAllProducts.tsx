import { baseApi } from "../../api/baseApi";

const getAllProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProductQuery } = getAllProductApi;
