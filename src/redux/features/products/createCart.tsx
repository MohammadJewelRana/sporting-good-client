 

import { baseApi } from "../../api/baseApi";

const createCartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createCart: builder.mutation({
        query: (data) => ({
          url: '/products/cart',
          method: "POST",
          body:data
        }),
      }),
    }),
  });
  
  export const {  useCreateCartQuery } = createCartApi;
 