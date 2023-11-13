import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Category,
  CategoryParams,
  Result,
  Results,
} from '../../types/Category';

export const baseUrl = 'http://localhost:2000';
const endPointUrl = '/categories';

/* function parseQueryParams(params: CategoryParams) {
  const query = new URLSearchParams();
  if (params.page) {
    query.append('page', params.page.toString());
  }
  if (params.perPage) {
    query.append('per_page', params.perPage.toString());
  }
  if (params.search) {
    query.append('search', params.search.toString());
  }
  if (params.isActive) {
    query.append('is_active', params.isActive.toString());
  }

  return query.toString();
} */

/* function getCategories({ page = 1, perPage = 20, search = '' }) {
  const params = { page, perPage, search, isActive: true };
  return `${endPointUrl}?${parseQueryParams(params)}`;
} */

function getCategories() {
  return endPointUrl;
}

function deleteCategoryMutation(category: Category) {
  return {
    url: `${endPointUrl}/${category.id}`,
    method: 'DELETE',
  };
}

function createCategoryMutation(category: Category) {
  return {
    url: baseUrl + endPointUrl,
    method: 'POST',
    body: category,
  };
}

function updateCategoryMutation(category: Category) {
  return {
    url: `${endPointUrl}/edit/${category.id}`,
    method: 'PUT',
    body: category,
  };
}

function getCategory({ id }: { id: string }) {
  return `${endPointUrl}/${id}`;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['categories'],
  endpoints: (builder) => ({
    getCategories: builder.query<Results, CategoryParams>({
      query: getCategories,
      providesTags: ['categories'],
    }),
    getCategory: builder.query<Category, { id: string }>({
      query: getCategory,
      providesTags: ['categories'],
    }),
    createCategory: builder.mutation<Result, Category>({
      query: createCategoryMutation,
      invalidatesTags: ['categories'],
    }),
    deleteCategory: builder.mutation<Result, { id: string }>({
      query: deleteCategoryMutation,
      invalidatesTags: ['categories'],
    }),
    updateCategory: builder.mutation<Result, { id: string }>({
      query: updateCategoryMutation,
      invalidatesTags: ['categories'],
    }),
  }),
});
