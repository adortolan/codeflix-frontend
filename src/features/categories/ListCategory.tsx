import { Box, Button, IconButton, Typography } from '@mui/material';
// import { useAppSelector } from '../../app/hooks';
import React, { useEffect, useState } from 'react';
// import { deleteCategory, selectCategories } from './CategorySlice';
// import { deleteCategory } from './CategorySlice';
import { Link } from 'react-router-dom';
import {
  DataGrid,
  GridColDef,
  GridDeleteIcon,
  GridRenderCellParams,
  GridRowsProp,
  GridToolbar,
} from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import { apiSlice } from '../api/apiSlice';

export const CategoryList = () => {
  // const categories = useAppSelector(selectCategories);

  const [page] = useState(1);
  const [perPage] = useState(10);
  const [search] = useState('');

  const options = { perPage, search, page };
  const { data, isFetching } = apiSlice.useGetCategoriesQuery(options);
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  const [deleteCategory, deleteCategoryStatus] =
    apiSlice.useDeleteCategoryMutation();

  const { enqueueSnackbar } = useSnackbar();
  const rows: GridRowsProp = data
    ? data.map((categories) => ({
        id: categories.id,
        name: categories.name,
        description: categories.description,
        is_active: categories.is_active,
        created_at: new Date(categories.created_at).toLocaleDateString('pt-BR'),
      }))
    : [];

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      renderCell: renderNameCell,
    },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'is_active',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    {
      field: 'id',
      headerName: 'Actions',
      flex: 1,
      renderCell: renderActionsCell,
    },
  ];

  function renderIsActiveCell(rowData: GridRenderCellParams) {
    return (
      <Typography color={rowData.value ? 'primary' : 'secondary'}>
        {rowData.value ? 'Active' : 'Inactive'}
      </Typography>
    );
  }

  function renderActionsCell(params: GridRenderCellParams) {
    return (
      <IconButton
        color="secondary"
        onClick={() => handleDeleteCategory(params.value)}
        aria-label="delete"
      >
        <GridDeleteIcon />
      </IconButton>
    );
  }

  function renderNameCell(rowData: GridRenderCellParams) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        to={`/categories/edit/${rowData.id}`}
      >
        <Typography color="primary">{rowData.value}</Typography>
      </Link>
    );
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar('Delete Category successfully!', { variant: 'success' });
    }

    if (deleteCategoryStatus.error) {
      enqueueSnackbar('Category not deleted!', { variant: 'error' });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

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

      <Box sx={{ display: 'flex', height: '600' }}>
        <DataGrid
          disableColumnSelector={true}
          disableColumnFilter={true}
          disableDensitySelector={true}
          slots={{ toolbar: GridToolbar }}
          checkboxSelection={true}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          rows={rows}
          columns={columns}
          loading={isFetching}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
        />
      </Box>
    </Box>
  );
};

export default CategoryList;
