import React, { useEffect, useState } from 'react';
import { CastMember } from '../../types/CastMembers';
import {
  useAddCastMembersMutation,
  initialState,
} from '../../services/castMembers';
import { useSnackbar } from 'notistack';
import { Box } from '@mui/system';
import { Paper, Typography } from '@mui/material';
import { CastMembersForm } from './CastMembersForm';

export const CreateCastMember = () => {
  const [castMemberState, setCastMemberState] =
    useState<CastMember>(initialState);
  const [addCastMembers, status] = useAddCastMembersMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCastMemberState({ ...castMemberState, [name]: value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addCastMembers(castMemberState);
  }

  useEffect(() => {
    if (status.isSuccess) {
      enqueueSnackbar('CastMember created successfully', {
        variant: 'success',
      });
    }
    if (status.isError) {
      enqueueSnackbar('CastMember not created', { variant: 'error' });
    }
  }, [status, enqueueSnackbar]);

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Create Cast Member</Typography>
          </Box>
        </Box>
        <CastMembersForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          castMember={castMemberState}
          isLoading={status.isLoading}
          isDisabled={status.isLoading}
        />
      </Paper>
    </Box>
  );
};
