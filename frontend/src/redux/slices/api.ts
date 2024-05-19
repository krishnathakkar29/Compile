import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { CompilerSliceStateType } from "./compilerSlice";
import {
  codeType,
  loginCredentialsType,
  signupCredentialsType,
  userInfoType,
} from "@/vite-env";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include", //to include the cookies as well
  }),
  tagTypes: ["myCodes", "auth"],
  endpoints: (builder) => ({
    //just define the type of the output and the arguments that i am getting
    saveCode: builder.mutation<{ url: string; status: string }, codeType>({
      query: (body) => {
        return {
          url: "/compiler/save",
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["myCodes"], //reset the cache of this endpoint
    }),
    loadCode: builder.mutation<
      { fullCode: CompilerSliceStateType["fullCode"]; isOwner: boolean },
      { urlId: string }
    >({
      query: (body) => ({
        url: "/compiler/load",
        method: "POST",
        body: body,
      }),
      // providesTags: ["auth"]
    }),
    login: builder.mutation<userInfoType, loginCredentialsType>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body: body,
        credentials: "include",
      }),
    }),
    signup: builder.mutation<userInfoType, signupCredentialsType>({
      query: (body) => ({
        url: "/user/signup",
        method: "POST",
        body: body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      // invalidatesTags: ["auth"]
    }),
    getUserDetails: builder.query<userInfoType, void>({
      query: () => ({ url: "/user/user-details", cache: "no-store" }),
    }),
    getMyCodes: builder.query<Array<codeType>, void>({
      query: () => "/user/my-codes",
      providesTags: ["myCodes"],
    }),
    deleteCode: builder.mutation<void, string>({
      query: (_id) => ({
        url: `/compiler/delete/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["myCodes"],
    }),

    editCode: builder.mutation<void , {fullCode: CompilerSliceStateType["fullCode"]; id:string}>({
      query: ({id,fullCode}) => ({
        url:`/compiler/edit/${id}`,
        method: "PUT",
        body: fullCode
      })
    })
  }),
});

export const {
  useSaveCodeMutation,
  useLoadCodeMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetUserDetailsQuery,
  useGetMyCodesQuery,
  useDeleteCodeMutation,
  useEditCodeMutation
} = api;
