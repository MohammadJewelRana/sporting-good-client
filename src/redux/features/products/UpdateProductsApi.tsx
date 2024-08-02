import { baseApi } from "../../api/baseApi";

const updateProductsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateProducts: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`, // Include the product ID in the URL
        method: "PATCH",
        body: data, // Send the remaining data in the body
      }),
    }),
  }),
});

export const { useUpdateProductsMutation } = updateProductsApi;