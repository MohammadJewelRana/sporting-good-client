import { baseApi } from "../../api/baseApi";

const getSingleProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSingleProductQuery } = getSingleProductApi;
 