import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

const rawBaseQuery = fetchBaseQuery({
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
    const res = await rawBaseQuery(parseArgs, ApiError, extraOptions);
    const status = (res as any)?.error?.status as number | undefined;
    if (status === 401) {
      toast.error("You are not authenticated");
    } else if (status === 403) {
      toast.error("You do not have permission to perform this action");
    }
    return res;
  },
  tagTypes: ["Cycle", "Application", "User", "Profile"],
  endpoints: () => ({}),
});
