import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Results } from '../types/Category';
import { Genre, GenreParams, GenrePayLoad, Result } from '../types/Genre';

const endPointUrl = '/genres';

export const initialState = {
  id: '',
  name: '',
  created_at: '',
  updated_at: '',
  deleted_at: null,
  isActive: false,
  categories: [],
  description: '',
  pivot: { genre_id: '', category_id: '' },
};

function parseQueryParams(param: GenreParams) {
  const query = new URLSearchParams();

  if (param.page) {
    query.append('page', param.page.toString());
  }

  if (param.perPage) {
    query.append('per_page', param.perPage.toString());
  }

  if (param.search) {
    query.append('search', param.search.toString());
  }

  if (param.isActive) {
    query.append('isActive', param.isActive.toString());
  }

  return query.toString();
}

export function getGenres({ page = 1, perPage = 20, search = '' }) {
  const params = { page, perPage, search };
  return `${endPointUrl}?${parseQueryParams(params)}`;
}

function deleteGenreMutation({ id }: { id: string }) {
  return {
    url: `${endPointUrl}/${id}`,
    method: 'DELETE',
  };
}

function getGenre({ id }: { id: string }) {
  return `${endPointUrl}/${id}`;
}

function updateGenreMutation(genre: GenrePayLoad) {
  return {
    url: `${endPointUrl}/edit/${genre.id}`,
    method: 'PUT',
    body: genre,
  };
}

function createGenreMutation(genre: Genre) {
  return { url: endPointUrl, method: 'POST', body: genre };
}

function getCategories() {
  return 'categories?all=true';
}

export const genreApi = createApi({
  reducerPath: 'genreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2000' }),
  tagTypes: ['genres'],
  endpoints: (builder) => ({
    getCategories: builder.query<Results, void>({
      query: getCategories,
    }),
    getGenres: builder.query({
      query: getGenres,
      providesTags: ['genres'],
    }),
    createGenre: builder.mutation<Result, Genre>({
      query: createGenreMutation,
      invalidatesTags: ['genres'],
    }),
    updateGenre: builder.mutation<Result, { id: string }>({
      query: updateGenreMutation,
      invalidatesTags: ['genres'],
    }),
    deleteGenre: builder.mutation<Result, { id: string }>({
      query: deleteGenreMutation,
      invalidatesTags: ['genres'],
    }),
    getGenre: builder.query<Genre, { id: string }>({
      query: getGenre,
      providesTags: ['genres'],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useDeleteGenreMutation,
  useGetGenreQuery,
  useGetCategoriesQuery,
  useUpdateGenreMutation,
  useCreateGenreMutation,
} = genreApi;
