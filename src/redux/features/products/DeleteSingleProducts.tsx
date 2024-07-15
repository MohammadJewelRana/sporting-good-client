import { baseApi } from "../../api/baseApi";

const deleteSingleProductApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      deleteSingleProduct: builder.mutation({
        query: (id) => ({
          url: `/products/${id}`,
          method: "DELETE",
        }),
      }),
    }),
  });
  
  export const { useDeleteSingleProductMutation } = deleteSingleProductApi;