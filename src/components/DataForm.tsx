import React, { useState } from 'react';
import { HealthData } from '../types/HealthData';
import { Button, TextField, Box } from '@mui/material';

interface DataFormProps {
  onAddData: (data: HealthData) => void;
}

export const DataForm: React.FC<DataFormProps> = ({ onAddData }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [weight, setWeight] = useState('');
  const [bodyFatPercentage, setBodyFatPercentage] = useState('');
  const [skeletalMuscleMass, setSkeletalMuscleMass] = useState('');
  const [basalMetabolism, setBasalMetabolism] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight && bodyFatPercentage && skeletalMuscleMass && basalMetabolism) {
      onAddData({
        date,
        weight: parseFloat(weight),
        bodyFatPercentage: parseFloat(bodyFatPercentage),
        skeletalMuscleMass: parseFloat(skeletalMuscleMass),
        basalMetabolism: parseInt(basalMetabolism),
      });
      setWeight('');
      setBodyFatPercentage('');
      setSkeletalMuscleMass('');
      setBasalMetabolism('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        label="日付"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="体重 (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="体脂肪率 (%)"
        type="number"
        value={bodyFatPercentage}
        onChange={(e) => setBodyFatPercentage(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="骨格筋量 (kg)"
        type="number"
        value={skeletalMuscleMass}
        onChange={(e) => setSkeletalMuscleMass(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="基礎代謝 (kcal)"
        type="number"
        value={basalMetabolism}
        onChange={(e) => setBasalMetabolism(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        記録する
      </Button>
    </Box>
  );
};
