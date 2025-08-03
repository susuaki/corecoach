import React from 'react';
import { HealthData } from '../types/HealthData';
import { Box, Typography, Paper } from '@mui/material';

interface AdviceProps {
  data: HealthData[];
}

const getAdvice = (data: HealthData[]) => {
  if (data.length < 2) {
    return {
      message: 'データを2日分以上記録すると、より詳細なアドバイスが表示されます。',
      trainingMenu: ['まずは記録を続けてみましょう！'],
    };
  }

  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  let message = '';
  let trainingMenu: string[] = [];

  // 体重の比較
  if (latestData.weight < previousData.weight) {
    message = '素晴らしい！体重が減少しています。この調子で頑張りましょう。';
    trainingMenu = ['ウォーキング 30分', '腹筋 20回 x 3セット', 'スクワット 15回 x 3セット'];
  } else if (latestData.weight > previousData.weight) {
    message = '体重が増加しています。食事内容を見直し、少し運動量を増やしてみましょう。';
    trainingMenu = ['ジョギング 20分', '腕立て伏せ 15回 x 3セット', 'プランク 60秒 x 2セット'];
  } else {
    message = '体重は維持されています。現状維持、またはさらなる目標に向けてトレーニングを調整しましょう。';
    trainingMenu = ['ストレッチ 15分', 'ヨガ 20分', '体幹トレーニング 15分'];
  }

  // ここに体脂肪率や骨格筋量などの指標に基づいた、より詳細なAI分析ロジックを将来的に追加します。

  return { message, trainingMenu };
};

export const Advice: React.FC<AdviceProps> = ({ data }) => {
  const { message, trainingMenu } = getAdvice(data);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 4, backgroundColor: '#f5f5f5' }}>
      <Typography variant="h5" gutterBottom>
        今日のアドバイス
      </Typography>
      <Typography variant="body1" paragraph>
        {message}
      </Typography>
      <Typography variant="h6" gutterBottom>
        おすすめトレーニングメニュー
      </Typography>
      <ul>
        {trainingMenu.map((item, index) => (
          <li key={index}>
            <Typography variant="body1">{item}</Typography>
          </li>
        ))}
      </ul>
    </Paper>
  );
};
