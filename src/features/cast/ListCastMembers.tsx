/* import { useEffect, useState } from 'react';
import { useGetCastMembersQuery } from '../../services/castMembers';
import { GridFilterModel } from '@mui/x-data-grid';
import { Search } from '@mui/icons-material';
import { Typography } from '@mui/material';
 */
const ListCastMembers = () => {
  /* const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [rownsPerPage, setRowsPerPage] = useState([10, 20, 50, 100]);
  const options = { page, perPage, search };

  const { data, isFetching, error } = useGetCastMembersQuery(options);

  function handleOnPageChange(page: number) {
    setPage(page + 1);
  }

  function handleOnPageSizeChange(perPage: number) {}

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join('');
      options.search = search;
      setSearch(search);
    }

    return setSearch('');
  }

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (error) {
    return <Typography variant="h2">Error!</Typography>;
  }
 */
  return <div>ListCastMembers</div>;
};

export default ListCastMembers;
