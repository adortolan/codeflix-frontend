import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CastMember, CastMembersParams } from '../../types/CastMembers';
import { Result } from '../../types/Category';

export const baseUrl = 'http://127.0.0.1:3000';
const endPointUrl = '/cast_members';

function parseQueryParams(params: CastMembersParams) {
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

  return query.toString();
}

function getCastMembers({ page = 1, perPage = 20, search = '' }) {
  const params = { page, perPage, search, isActive: true };
  return `${endPointUrl}?${parseQueryParams(params)}`;
}

function deleteCastMemberMutation(cast: CastMember) {
  return {
    url: `${endPointUrl}/${cast.id}`,
    method: 'DELETE',
  };
}

function createCastMemberMutation(cast: CastMember) {
  return {
    url: endPointUrl,
    method: 'POST',
    body: cast,
  };
}

function updateCastMemberMutation(cast: CastMember) {
  return {
    url: `${endPointUrl}/${cast.id}`,
    method: 'PUT',
    body: cast,
  };
}

function getCastMember({ id }: { id: string }) {
  return `${endPointUrl}/${id}`;
}

export const apiSliceCastMembers = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['cast_members'],
  endpoints: (builder) => ({
    getCastMembers: builder.query<CastMember[], CastMembersParams>({
      query: getCastMembers,
      providesTags: ['cast_members'],
    }),
    getCastMember: builder.query<CastMember, { id: string }>({
      query: getCastMember,
      providesTags: ['cast_members'],
    }),
    createCastMember: builder.mutation<Result, CastMember>({
      query: createCastMemberMutation,
      invalidatesTags: ['cast_members'],
    }),
    deleteCastMember: builder.mutation<Result, { id: string }>({
      query: deleteCastMemberMutation,
      invalidatesTags: ['cast_members'],
    }),
    updateCastMember: builder.mutation<Result, { id: string }>({
      query: updateCastMemberMutation,
      invalidatesTags: ['cast_members'],
    }),
  }),
});
