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
  const [skeletalMusclePercentage, setSkeletalMusclePercentage] = useState('');
  const [basalMetabolism, setBasalMetabolism] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 入力値の検証
    const weightNum = parseFloat(weight);
    const bodyFatNum = parseFloat(bodyFatPercentage);
    const muscleNum = parseFloat(skeletalMusclePercentage);
    const metabolismNum = parseInt(basalMetabolism);
    
    // 数値の範囲チェック
    if (!weight || !bodyFatPercentage || !skeletalMusclePercentage || !basalMetabolism) {
      alert('すべての項目を入力してください。');
      return;
    }
    
    if (isNaN(weightNum) || weightNum <= 0 || weightNum > 1000) {
      alert('体重は0より大きく1000kg以下の数値を入力してください。');
      return;
    }
    
    if (isNaN(bodyFatNum) || bodyFatNum < 0 || bodyFatNum > 100) {
      alert('体脂肪率は0%以上100%以下の数値を入力してください。');
      return;
    }
    
    if (isNaN(muscleNum) || muscleNum < 0 || muscleNum > 100) {
      alert('骨格筋率は0%以上100%以下の数値を入力してください。');
      return;
    }
    
    if (isNaN(metabolismNum) || metabolismNum <= 0 || metabolismNum > 10000) {
      alert('基礎代謝は0より大きく10000kcal以下の数値を入力してください。');
      return;
    }
    
    // 日付の妥当性チェック
    const dateObj = new Date(date);
    const today = new Date();
    if (dateObj > today) {
      alert('未来の日付は入力できません。');
      return;
    }
    
    onAddData({
      date,
      weight: weightNum,
      bodyFatPercentage: bodyFatNum,
      skeletalMusclePercentage: muscleNum,
      basalMetabolism: metabolismNum,
    });
    
    setWeight('');
    setBodyFatPercentage('');
    setSkeletalMusclePercentage('');
    setBasalMetabolism('');
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
        label="骨格筋率 (%)"
        type="number"
        value={skeletalMusclePercentage}
        onChange={(e) => setSkeletalMusclePercentage(e.target.value)}
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
