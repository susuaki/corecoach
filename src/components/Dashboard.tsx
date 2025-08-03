import React from 'react';
import { useHealthData } from '../hooks/useHealthData';
import { DataForm } from './DataForm';
import { DataChart } from './DataChart';
import { Advice } from './Advice';
import { Backup } from './Backup';
import { DataHistory } from './DataHistory'; // DataHistoryをインポート
import { Container, Typography, Box, AppBar, Toolbar } from '@mui/material';

export const Dashboard: React.FC = () => {
  // deleteHealthDataをフックから取得
  const { healthData, addHealthData, deleteHealthData, importHealthData } = useHealthData();

  // 削除ハンドラを定義
  const handleDelete = (date: string) => {
    // ユーザーに削除の確認を求める
    if (window.confirm(`${formatDate(date)}のデータを本当に削除しますか？`)) {
      deleteHealthData(date);
    }
  };

  // 日付を分かりやすい形式にフォーマットするヘルパー関数
  const formatDate = (dateString: string) => {
    try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (e) {
        return dateString;
    }
  }

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
            {/* DataHistoryコンポーネントを追加し、データと削除ハンドラを渡す */}
            <DataHistory data={healthData} onDelete={handleDelete} />
            <Backup data={healthData} onImport={importHealthData} />
          </>
        )}
      </Container>
    </Box>
  );
};