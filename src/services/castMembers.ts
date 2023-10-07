// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CastMember, Result } from '../types/CastMembers';

const endPointUrl = '/cast_members';

/* function parseQueryParams(params: CastMembersParams) {
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
} */

function updateCastMembersMutation(castMembers: CastMember) {
  return {
    url: `${endPointUrl}/${castMembers.id}`,
    method: 'PUT',
    body: castMembers,
  };
}

function deleteCastMemberMutation(castMember: CastMember) {
  return {
    url: `${endPointUrl}/${castMember.id}`,
    method: 'DELETE',
  };
}

function getCastMember({ id }: { id: string }) {
  return `${endPointUrl}/${id}`;
}

// Define a service using a base URL and expected endpoints
export const castMembersApi = createApi({
  reducerPath: 'castMembersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:3000' }),
  tagTypes: ['castMembers'],
  endpoints: (build) => ({
    getCastMembers: build.query({
      query: () => '/cast_members',
      providesTags: ['castMembers'],
    }),
    addCastMembers: build.mutation<Result, CastMember>({
      query: (body) => ({
        url: '/cast_members',
        method: 'POST',
        body,
      }),
    }),
    updateCastMember: build.mutation<Result, { id: string }>({
      query: updateCastMembersMutation,
      invalidatesTags: ['castMembers'],
    }),
    deleteCastMember: build.mutation<Result, { id: string }>({
      query: deleteCastMemberMutation,
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
} = castMembersApi;
