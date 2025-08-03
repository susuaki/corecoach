import React from 'react';
import { useHealthData } from '../hooks/useHealthData';
import { DataForm } from './DataForm';
import { DataChart } from './DataChart';
import { Advice } from './Advice';
import { Backup } from './Backup';
import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material';

export const Dashboard: React.FC = () => {
  const { healthData, addHealthData, importHealthData } = useHealthData();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoreCoach
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          今日の記録
        </Typography>
        <DataForm onAddData={addHealthData} />
        {healthData.length > 0 && (
          <>
            <Advice data={healthData} />
            <DataChart data={healthData} />
            <Backup data={healthData} onImport={importHealthData} />
          </>
        )}
      </Container>
    </Box>
  );
};
