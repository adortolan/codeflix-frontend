import React, { useEffect, useState } from 'react';
import { CastMember } from '../../types/CastMembers';
import {
  initialState,
  useUpdateCastMemberMutation,
  useGetCastMemberQuery,
} from '../../services/castMembers';

import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import { CastMembersForm } from './CastMembersForm';
import { useParams } from 'react-router-dom';

export const EditCastMember = () => {
  const id = useParams().id ?? '';

  const { data: castMember, isFetching } = useGetCastMemberQuery({ id });
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [updateCastMember, status] = useUpdateCastMemberMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateCastMember(castMemberState);
  };

  useEffect(() => {
    if (castMember) {
      setCastMemberState(castMember);
    }
  }, [castMember]);

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('Cast Member updated successfully', {
        variant: 'success',
      });
    }

    if (status.isError) {
      enqueueSnackbar('Error updating cast member', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Cast member</Typography>
          </Box>
        </Box>
        <CastMembersForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          castMember={castMemberState}
          isLoading={isFetching || status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
