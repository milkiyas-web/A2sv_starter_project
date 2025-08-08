import { CreateCyclePayload, Cycle, GetCyclesResponse } from "../types/cycle";
import { internalApi } from "./baseApi";

export const cycleApi = internalApi.injectEndpoints({
  endpoints: (build) => ({
    getCycle: build.query<GetCyclesResponse, void>({
      query: () => ({
        url: `cycles`,
        method: "GET",
      }),
      providesTags: ["Cycle"],
    }),

    createCycle: build.mutation<
      { success: boolean; data: Cycle },
      CreateCyclePayload
    >({
      query: (payload) => ({
        url: "/admin/cycles",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Cycle"],
    }),
  }),
});
// src/lib/api/cycles.ts

export async function fetchCycles(): Promise<GetCyclesResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cycles`, {
    method: "GET",
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json?.message || "Failed to fetch cycles");
  return json as GetCyclesResponse;
}
export const { useCreateCycleMutation, useGetCycleQuery } = cycleApi;
