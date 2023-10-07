import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface Category {
  id: string;
  name: string;
  deleted_at: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  description: null | string;
}

const category: Category = {
  id: '0ce68ddd-4981-4ee2-a23b-a01452b96b01',
  name: 'Olive',
  description: 'Teste de categoria',
  is_active: true,
  deleted_at: null,
  created_at: '2022-08-15T10:59:09+0000',
  updated_at: '2022-08-15T10:59:09+0000',
};

export const initialState = [
  category,
  {
    ...category,
    id: '0ce68ddd-4981-4ee2-a23b-a01452b96b02',
    name: 'Peach',
    is_active: false,
  },
  { ...category, id: '0ce68ddd-4981-4ee2-a23b-a01452b96b03', name: 'Apple' },
  {
    ...category,
    id: '0ce68ddd-4981-4ee2-a23b-a01452b96b04',
    name: 'Banana',
    is_active: false,
    created_at: '2022-08-15T10:59:09+0000',
  },
];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    createCategory(state, action) {
      state.push(action.payload);
    },
    updateCategory(state, action) {
      // find index of category
      const index = state.findIndex(
        (category) => category.id === action.payload.id,
      );

      // update category on state change
      state[index] = action.payload;
    },
    deleteCategory(state, action) {
      // find index on state of category to delete
      const index = state.findIndex(
        (category) => category.id === action.payload.id,
      );
      state.splice(index, 1);
    },
  },
});

// Selectors
export const selectCategories = (state: RootState) => state.categories;

export const selectCategoryById = (state: RootState, id: string) => {
  const category = state.categories.find((category) => category.id === id);

  return (
    category || {
      id: '',
      name: '',
      description: '',
      is_active: false,
      deleted_at: null,
      created_at: '',
      updated_at: '',
    }
  );
};

export default categoriesSlice.reducer;
export const { createCategory, updateCategory, deleteCategory } =
  categoriesSlice.actions;
