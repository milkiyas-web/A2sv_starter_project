import {
  CreateUserPayload,
  DeleteUserPayload,
  GetUsersParams,
  GetusersResponse,
  UpdateUserPayload,
  User,
} from "../types/users";
import { baseApi, internalApi } from "./baseApi";

export const userApi = internalApi.injectEndpoints({
  endpoints: (build) => ({
    getusers: build.query<GetusersResponse, GetUsersParams>({
      query: ({ page = 1, limit = 4 }) => ({
        url: `get-users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUsersById: build.query<User, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    createUser: build.mutation<
      { success: boolean; data: User },
      CreateUserPayload
    >({
      query: (payload) => ({
        url: "/admin/users",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation<
      User,
      { userId: string; payload: UpdateUserPayload }
    >({
      query: ({ userId, payload }) => ({
        url: `/admin/users/${userId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<
      User,
      { userId: string; payload: DeleteUserPayload }
    >({
      query: ({ userId, payload }) => ({
        url: `/admin/users/${userId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetusersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
