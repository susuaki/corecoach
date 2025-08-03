import React from 'react';
import { HealthData } from '../types/HealthData';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';

interface DataHistoryProps {
  data: HealthData[];
  onDelete: (date: string) => void;
}

export const DataHistory: React.FC<DataHistoryProps> = ({ data, onDelete }) => {
  // データを新しい順にソートして表示
  const sortedData = [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
            記録履歴
        </Typography>
        <TableContainer component={Paper}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>日付</TableCell>
                <TableCell align="right">体重 (kg)</TableCell>
                <TableCell align="right">体脂肪率 (%)</TableCell>
                <TableCell align="right">骨格筋率 (%)</TableCell>
                <TableCell align="right">基礎代謝 (kcal)</TableCell>
                <TableCell align="center">操作</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {sortedData.map((row) => (
                <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                    {/* 日付のフォーマットを調整 */}
                    {format(new Date(row.date + 'T00:00:00'), 'yyyy/MM/dd')}
                </TableCell>
                <TableCell align="right">{(row.weight || 0).toFixed(1)}</TableCell>
                <TableCell align="right">{(row.bodyFatPercentage || 0).toFixed(1)}</TableCell>
                <TableCell align="right">{(row.skeletalMusclePercentage || 0).toFixed(1)}</TableCell>
                <TableCell align="right">{row.basalMetabolism || 0}</TableCell>
                <TableCell align="center">
                    <IconButton onClick={() => onDelete(row.date)} size="small">
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
};
