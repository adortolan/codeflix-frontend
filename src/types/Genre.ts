import { Category } from './Category';

export interface Genres {
  data: Genre[];
  links: Links;
  meta: Meta;
}

export interface Result {
  data: Genre;
  links: Links;
  meta: Meta;
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Meta {
  current_page?: number;
  from?: number;
  last_page?: number;
  path?: string;
  per_page?: number;
  to?: number;
  total?: number;
}

export interface Genre {
  id: string;
  name: string;
  isActive: boolean;
  delete_At?: string;
  created_At?: string;
  updated_At?: string;
  categories?: Category[];
  description: null | string;
  pivot?: Pivot;
}

export interface Pivot {
  genre_id: string;
  category_id: string;
}

export interface GenreParams {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface GenrePayLoad {
  id: string;
  name: string;
  categories_id: string[];
}
