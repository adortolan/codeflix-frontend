// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { GridFilterModel } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { apiSlice } from '../api/apiSlice';
import { CategoriesTable } from '../../components/CategoryTable';

const CategoryList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [options, setOptions] = useState({
    page: 1,
    search: '',
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = apiSlice.useGetCategoriesQuery(options);
  const [deleteCategory, { error: deleteError, isSuccess: deleteSuccess }] =
    apiSlice.useDeleteCategoryMutation();

  console.log(data);

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setOptions({ ...options, search: '' });
    }

    const search = filterModel.quickFilterValues.join('');
    setOptions({ ...options, search });
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteSuccess) {
      enqueueSnackbar('Category deleted', { variant: 'success' });
    }
    if (deleteError) {
      enqueueSnackbar('Category not deleted', { variant: 'error' });
    }
  }, [deleteSuccess, deleteError, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/categories/create"
          style={{ marginBottom: '1rem' }}
        >
          New Category
        </Button>
      </Box>

      <CategoriesTable
        data={data}
        isFetching={isFetching}
        perPage={options.perPage}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};

export default CategoryList;
