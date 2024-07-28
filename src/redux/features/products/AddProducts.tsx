 

import { baseApi } from "../../api/baseApi";

const createProductsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      addProducts: builder.mutation({
        query: (data) => ({
          url: '/products/add-products',
          method: "POST",
          body:data
        }),
      }),
    }),
  });
  
  export const {  useAddProductsMutation } = createProductsApi;
 