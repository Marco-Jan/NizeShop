// App.js oder deine Hauptkomponente
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; 
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <Navbar />
      <Outlet /> 
      <Footer />
    </Box>
  );
}

export default App;
