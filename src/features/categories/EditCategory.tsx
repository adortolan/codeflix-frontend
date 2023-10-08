import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useAppSelector } from '../../app/hooks';
import { Category } from './CategorySlice';
import CategoryForm from './components/CategoryForm';
// import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { apiSlice } from '../api/apiSlice';

export default function CategoryEdit() {
  const id = useParams().id || '';

  const { data: category, isFetching } = apiSlice.useGetCategoryQuery({ id });
  const [updateCategory, status] = apiSlice.useUpdateCategoryMutation();
  console.log(category);

  // const category = useAppSelector((state) => selectCategoryById(state, id));

  const [categoryState, setCategoryState] = useState<Category>({
    id: '',
    name: '',
    deleted_at: '',
    is_active: false,
    created_at: '',
    updated_at: '',
    description: '',
  });

  // const [isDisabled, setIsDisabled] = useState(false);
  // const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // dispatch(updateCategory(categoryState));
    await updateCategory(categoryState);
    // enqueueSnackbar('Success updating category!', { variant: 'success' });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  useEffect(() => {
    if (category) {
      setCategoryState(category);
    }
  }, [category]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Category updated successfully', { variant: 'success' });
      isFetching;
    }
    if (status.error) {
      enqueueSnackbar('Category not updated', { variant: 'error' });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={status.isLoading}
          isLoading={false}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}
