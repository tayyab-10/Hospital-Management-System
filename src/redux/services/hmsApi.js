import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const HOST = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
export const hmsApi = createApi({
  reducerPath: "hmsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: `/auth/login/${credentials.role}`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    getAllDoctors: builder.query({
      query: (authToken) => ({
        url: "/mainadmin/doctorlist",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getAllPatients: builder.query({
      query: (authToken) => ({
        url: "/doctor/patientlist",
        method: "GET",
        headers: {
          "auth-token": `${authToken}`,
        },
      }),
    }),
    getDoctors: builder.query({
      query: () => ({
        url: "/doctors",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetAllDoctorsQuery,
  useGetAllPatientsQuery,
  useGetDoctorsQuery,
} = hmsApi;
