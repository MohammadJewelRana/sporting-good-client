import { baseApi } from "../../api/baseApi";

const getSingleUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {  useGetSingleUserQuery } = getSingleUserApi;
