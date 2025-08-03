import React from 'react';
import { HealthData } from '../types/HealthData';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

interface DataChartProps {
  data: HealthData[];
}

export const DataChart: React.FC<DataChartProps> = ({ data }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        データの推移
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" name="体重 (kg)" />
          <Line type="monotone" dataKey="bodyFatPercentage" stroke="#82ca9d" name="体脂肪率 (%)" />
          <Line type="monotone" dataKey="skeletalMuscleMass" stroke="#ffc658" name="骨格筋量 (kg)" />
          <Line type="monotone" dataKey="basalMetabolism" stroke="#ff7300" name="基礎代謝 (kcal)" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};
