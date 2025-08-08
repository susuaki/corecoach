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
    const getJSTDateString = () => {
      const now = new Date();
      const jstOffset = 9 * 60; // JST is UTC+9
      const jstTime = new Date(now.getTime() + (jstOffset * 60 * 1000));
      return jstTime.toISOString().split('T')[0];
    };

    const jstDateString = getJSTDateString();
    
    const exportData = {
      metadata: {
        app_name: "CoreCoach",
        description: "このJSONは、CoreCoachアプリで記録された日々の健康データ（体重、体脂肪率、骨格筋率、基礎代謝）のリストです。",
        export_date: jstDateString,
      },
      health_data: data,
    };
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `corecoach_backup_${jstDateString}.json`;

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
      // ファイルサイズの制限（10MB）
      if (file.size > 10 * 1024 * 1024) {
        alert('ファイルサイズが大きすぎます。10MB以下のファイルを選択してください。');
        return;
      }
      
      // ファイル形式のチェック
      if (!file.name.toLowerCase().endsWith('.json')) {
        alert('JSONファイルのみ対応しています。');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          
          // テキスト長の制限
          if (text.length > 1024 * 1024) {
            alert('ファイルの内容が大きすぎます。');
            return;
          }
          
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
          
          // 配列の長さ制限
          if (dataToImport.length > 10000) {
            alert('データの件数が多すぎます。10000件以下のデータを選択してください。');
            return;
          }
          
          onImport(dataToImport);
        } catch (error) {
          alert('ファイルの読み込みに失敗しました。有効なJSONファイルを選択してください。');
          console.error('Failed to parse imported file', error);
        }
      };
      
      reader.onerror = () => {
        alert('ファイルの読み込み中にエラーが発生しました。');
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
