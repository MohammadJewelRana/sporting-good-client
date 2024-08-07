


import { baseApi } from "../../api/baseApi";

const addUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      addUser: builder.mutation({
        query: (data) => ({
          url: '/user/create-user',
          method: "POST",
          body:data
        }),
      }),
    }),
  });

  export const {  useAddUserMutation  } =  addUserApi;
