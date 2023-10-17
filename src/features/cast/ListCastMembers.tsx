import {
  useGetCastMembersQuery,
  useDeleteCastMemberMutation,
} from '../../services/castMembers';
import { useEffect, useState } from 'react';
import { GridFilterModel } from '@mui/x-data-grid';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { CastMembersTable } from '../../components/CastMembersTable';
import { enqueueSnackbar } from 'notistack';

const ListCastMembers = () => {
  const [options, setOptions] = useState({
    page: 1,
    search: '',
    perPage: 10,
    rowsPerPage: [10, 20, 30],
  });
  const { data, isFetching, error } = useGetCastMembersQuery(options);
  const [deleteCastMember, deleteCastMemberStatus] =
    useDeleteCastMemberMutation();

  async function handleDeleteCastMember(id: string) {
    await deleteCastMember({ id });
  }

  function handleOnPageChange(page: number) {
    setOptions({ ...options, page: page + 1 });
  }

  function handleOnPageSizeChange(perPage: number) {
    setOptions({ ...options, perPage: perPage });
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join('');
      return setOptions({ ...options, search });
    }

    return setOptions({ ...options, search: '' });
  }

  useEffect(() => {
    if (deleteCastMemberStatus.isSuccess) {
      enqueueSnackbar('Cast member deleted', { variant: 'success' });
    }
    if (deleteCastMemberStatus.isError) {
      enqueueSnackbar('Cast member not deleted', { variant: 'error' });
    }
  }, [deleteCastMemberStatus, enqueueSnackbar]);

  if (error) {
    return <Typography variant="h2">Error!</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/castmembers/create"
          style={{ marginBottom: '1rem' }}
        >
          New Cast Members
        </Button>
      </Box>
      <CastMembersTable
        data={data}
        perPage={options.perPage}
        isFetching={isFetching}
        rowsPerPage={options.rowsPerPage}
        handleDelete={handleDeleteCastMember}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};

export default ListCastMembers;
