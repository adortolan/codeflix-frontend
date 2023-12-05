import React from 'react';
import './App.css';
import { Box, Typography } from '@mui/material';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import CategoryList from './features/categories/ListCategory';
import CategoryCreate from './features/categories/CreateCategory';
import CategoryEdit from './features/categories/EditCategory';
import ListCastMembers from './features/cast/ListCastMembers';
import { CreateCastMember } from './features/cast/CreateCastMembers';
import { EditCastMember } from './features/cast/EditCastMembers';
import { GenreList } from './features/genre/GenreList';
import { GenreEdit } from './features/genre/GenreEdit';
import { GenreCreate } from './features/genre/GenreCreate';

function App() {
  return (
    <div data-testid="app">
      <Layout>
        <h1>Welcome to react router</h1>
        <Routes>
          <Route path="/" element={<CategoryList />} />
          {/* Category */}
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/categories/create" element={<CategoryCreate />} />
          <Route path="/categories/edit/:id" element={<CategoryEdit />} />

          {/* CastMembers */}
          <Route path="/castmembers" element={<ListCastMembers />} />
          <Route path="/castmembers/create" element={<CreateCastMember />} />
          <Route path="/castmembers/edit/:id" element={<EditCastMember />} />

          {/* GENRES */}
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/edit/:id" element={<GenreEdit />} />
          <Route path="/genres/create" element={<GenreCreate />} />
          <Route
            path="*"
            element={
              <Box sx={{ color: 'white' }}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h2">Page not found</Typography>
              </Box>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
