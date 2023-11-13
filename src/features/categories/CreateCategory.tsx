import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Category } from './CategorySlice';
import CategoryForm from './components/CategoryForm';
import { useSnackbar } from 'notistack';
import { apiSlice } from '../api/apiSlice';

export default function CategoryCreate() {
  const [createCategory, status] = apiSlice.useCreateCategoryMutation();
  const [isDisabled, setIsDisabled] = useState(false);
  const [categoryState, setCategoryState] = useState<Category>({
    id: '',
    name: '',
    deleted_at: '',
    is_active: false,
    created_at: '',
    updated_at: '',
    description: '',
  });

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createCategory(categoryState);

    setIsDisabled(false);
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
    if (status.isSuccess) {
      enqueueSnackbar('Category create successfully', { variant: 'success' });
      setIsDisabled(true);
    }

    if (status.error) {
      enqueueSnackbar('Category not create', { variant: 'error' });
    }
  }, [enqueueSnackbar, status.error, status.isSuccess]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Category</Typography>
          </Box>
        </Box>
        <CategoryForm
          category={categoryState}
          isDisabled={isDisabled}
          isLoading={false}
          onSubmit={handleSubmit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
}
