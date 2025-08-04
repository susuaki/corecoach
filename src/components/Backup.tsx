import React, { useRef } from 'react';
import { HealthData } from '../types/HealthData';
import { Button, Box, Typography } from '@mui/material';

interface BackupProps {
  data: HealthData[];
  onImport: (data: HealthData[]) => void;
}

export const Backup: React.FC<BackupProps> = ({ data, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const exportData = {
      metadata: {
        app_name: "CoreCoach",
        description: "このJSONは、CoreCoachアプリで記録された日々の健康データ（体重、体脂肪率、骨格筋率、基礎代謝）のリストです。",
        export_date: new Date().toISOString().split('T')[0],
      },
      health_data: data,
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `corecoach_backup_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsedData = JSON.parse(text);
          let dataToImport: HealthData[];

          // 新しい形式（メタデータあり）と古い形式（配列のみ）の両方に対応
          if (parsedData && typeof parsedData === 'object' && 'health_data' in parsedData) {
            dataToImport = parsedData.health_data;
          } else if (Array.isArray(parsedData)) {
            dataToImport = parsedData;
          } else {
            throw new Error('Invalid JSON format.');
          }
          onImport(dataToImport);
        } catch (error) {
          alert('ファイルの読み込みに失敗しました。有効なJSONファイルを選択してください。');
          console.error('Failed to parse imported file', error);
        }
      };
      reader.readAsText(file);
    }
    // 同じファイルを選択してもイベントが発火するように値をリセット
    event.target.value = '';
  };

  return (
    <Box sx={{ mt: 4, p: 2, border: '1px dashed grey' }}>
        <Typography variant="h6" gutterBottom>
            データ管理
        </Typography>
      <Button variant="outlined" onClick={handleExport} sx={{ mr: 2 }}>
        バックアップ (エクスポート)
      </Button>
      <Button variant="outlined" onClick={handleImportClick}>
        復元 (インポート)
      </Button>
      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </Box>
  );
};
