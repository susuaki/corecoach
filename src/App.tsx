import React from 'react';
import { Dashboard } from './components/Dashboard';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // 落ち着いた青色
    },
    secondary: {
      main: '#4caf50', // モチベーションを高める緑色
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;