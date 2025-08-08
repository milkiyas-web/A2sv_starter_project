import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

export const internalApi = createApi({
  reducerPath: "internalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
    credentials: "include",
  }),
  tagTypes: ["User", "Cycle"],

  endpoints: () => ({}),
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: async (parseArgs, ApiError, extraOptions) => {
    return baseQuery(parseArgs, ApiError, extraOptions);
  },
  tagTypes: ["Cycle", "Application", "User", "Profile"],
  endpoints: () => ({}),
});
