import React from 'react';
import './App.css';
import { Box, ThemeProvider, Typography } from '@mui/material';
import Header from './components/Header';
import { Layout } from './components/Layout';
import { appTheme } from './config/Theme';
import { Route, Routes } from 'react-router-dom';
import CategoryList from './features/categories/ListCategory';
import CategoryCreate from './features/categories/CreateCategory';
import CategoryEdit from './features/categories/EditCategory';
import { SnackbarProvider } from 'notistack';
import ListCastMembers from './features/cast/ListCastMembers';
import { CreateCastMember } from './features/cast/CreateCastMembers';
import { EditCastMember } from './features/cast/EditCastMebers';

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box
          component="main"
          sx={{
            height: '100vh',
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
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
              <Route
                path="/castmembers/create"
                element={<CreateCastMember />}
              />
              <Route
                path="/castmembers/edit/:id"
                element={<EditCastMember />}
              />
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
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
