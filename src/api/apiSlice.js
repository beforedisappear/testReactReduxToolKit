import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlise = createApi({
  reducerPath: "api", // название reducer default - api
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }), // метод для запроса, базовы адрес запроса
  tagTypes: ["Heroes"],
  endpoints: (builder) => ({
    // операции по базовому адресу
    getHeroes: builder.query({
      query: () => "/heroes", // куда делаем запрос
      providesTags: ["Heroes"],
    }),
    createHero: builder.mutation({
      query: (hero) => ({
        url: "/heroes",
        method: "POST",
        body: hero, // автоматически перейдет в json
      }),
      invalidatesTags: ["Heroes"],
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/heroes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Heroes"],
    }),
    getFilters: builder.query({
      query: () => "/filters",
    }),
  }),
});

export const {
  useGetHeroesQuery,
  useCreateHeroMutation,
  useDeleteHeroMutation,
  useGetFiltersQuery,
} = apiSlise; // генерация хука
