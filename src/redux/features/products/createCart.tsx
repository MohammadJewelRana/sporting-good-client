

// import { baseApi } from "../../api/baseApi";

// const createCartApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({
//       createCart: builder.mutation({
//         query: (data) => ({
//           url: '/products/cart',
//           method: "POST",
//           body:data
//         }),
//       }),
//     }),
//   });

//   export const {  useCreateCartQuery } = createCartApi;



import { baseApi } from "../../api/baseApi";

const createOrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      order: builder.mutation({
        query: (data) => ({
          url: '/products/order',
          method: "POST",
          body:data
        }),
      }),
    }),
  });

  export const {  useOrderMutation } = createOrderApi;
