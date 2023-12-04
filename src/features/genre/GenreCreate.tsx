import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Genre } from '../../types/Genre';
import { GenreForm } from './components/GenreForm';
import {
  initialState as genreInitialState,
  useCreateGenreMutation,
  useGetCategoriesQuery,
} from '../../services/GenreSlice';

export const GenreCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: categories } = useGetCategoriesQuery();
  const [createGenre, status] = useCreateGenreMutation();
  const [genreState, setGenreState] = useState<Genre>(genreInitialState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setGenreState({ ...genreState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await createGenre(genreState);
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Genre created successfully', { variant: 'success' });
    }

    if (status.isError) {
      enqueueSnackbar('Error creating genre', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Genre</Typography>
          </Box>
        </Box>

        <GenreForm
          genre={genreState}
          categories={categories?.data ?? []}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      </Paper>
    </Box>
  );
};
