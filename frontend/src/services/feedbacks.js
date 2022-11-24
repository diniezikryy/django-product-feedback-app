import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbacksAPI = createApi({
  reducerPath: "feedbacksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/feedbacks/",
  }),
  endpoints: (builder) => ({
    getAllFeedbacks: builder.query({
      query: () => `getAllFeedbacks`,
    }),
  }),
});

export const { useGetAllFeedbacksQuery } = feedbacksAPI;
