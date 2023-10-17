// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CastMember, CastMembersParams, Result } from '../types/CastMembers';

const endPointUrl = '/castmembers';

export const initialState: CastMember = {
  id: crypto.randomUUID(),
  name: '',
  type: 1,
  created_at: '',
  updated_at: '',
  deleted_at: null,
};

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
  if (params.type) {
    query.append('type', params.type.toString());
  }

  return query.toString();
}

function getCastMembers({ page = 1, perPage = 20, search = '' }) {
  const params = { page, perPage, search, isActive: true };
  return `${endPointUrl}?${parseQueryParams(params)}`;
}

function updateCastMembersMutation(castMembers: CastMember) {
  return {
    url: `${endPointUrl}/${castMembers.id}`,
    method: 'PUT',
    body: castMembers,
  };
}

function deleteCastMember({ id }: { id: string }) {
  return {
    method: 'DELETE',
    url: `${endPointUrl}/${id}`,
  };
}

function getCastMember({ id }: { id: string }) {
  return `${endPointUrl}/${id}`;
}

// Define a service using a base URL and expected endpoints
export const castMembersApi = createApi({
  reducerPath: 'castMembersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:2000' }),
  tagTypes: ['castMembers'],
  endpoints: (build) => ({
    getCastMembers: build.query({
      query: getCastMembers,
      providesTags: ['castMembers'],
    }),
    addCastMembers: build.mutation<Result, CastMember>({
      query: (body) => ({
        url: '/castmembers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['castMembers'],
    }),
    updateCastMember: build.mutation<Result, { id: string }>({
      query: updateCastMembersMutation,
      invalidatesTags: ['castMembers'],
    }),
    deleteCastMember: build.mutation<Result, { id: string }>({
      query: deleteCastMember,
      invalidatesTags: ['castMembers'],
    }),
    getCastMember: build.query<CastMember, { id: string }>({
      query: getCastMember,
      providesTags: ['castMembers'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCastMembersQuery,
  useAddCastMembersMutation,
  useUpdateCastMemberMutation,
  useGetCastMemberQuery,
  useDeleteCastMemberMutation,
} = castMembersApi;
