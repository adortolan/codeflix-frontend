import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../CategorySlice';

type Props = {
  category: Category;
  isDisabled?: boolean;
  isLoading?: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CategoryForm({
  category,
  isDisabled = false,
  isLoading = false,
  onSubmit,
  handleChange,
  handleToggle,
}: Props) {
  return (
    <Box p={2}>
      {isLoading}
      <form onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                required
                name="name"
                label="Name"
                value={category.name}
                disabled={isDisabled}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              required
              name="description"
              label="Description"
              value={category.description}
              disabled={isDisabled}
              onChange={handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  name="is_active"
                  color="secondary"
                  onChange={handleToggle}
                  checked={category.is_active}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="active"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <Button variant="contained" component={Link} to="/categories">
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isDisabled}
            >
              Save
            </Button>
          </Box>
        </Grid>
      </form>
    </Box>
  );
}
