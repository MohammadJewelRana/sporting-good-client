import { baseApi } from "../../api/baseApi";

const getCartProductInfoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCartProduct: builder.query({
      query: (data) => ({
        url: '/products/cart',
        method: "POST",
        body: data, // Pass data as the body of the POST request
      }),
    }),
  }),
});

export const { useGetCartProductQuery } = getCartProductInfoApi;