export interface Results {
  data: CastMember[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: CastMember;
  meta: Meta;
  links: Links;
}

export interface CastMember {
  id: string;
  name: string;
  type: number;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface Meta {
  currentPage: number;
  from: number;
  lastPage: number;
  path: string;
  perPage: number;
  to: number;
  total: number;
}

export interface CastMembersParams {
  page?: number;
  perPage?: number;
  search?: string;
  type?: number;
}
