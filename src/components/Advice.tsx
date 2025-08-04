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

  const weightDiff = latestData.weight - previousData.weight;
  const bodyFatDiff = latestData.bodyFatPercentage - previousData.bodyFatPercentage;
  const skeletalMuscleDiff = latestData.skeletalMusclePercentage - previousData.skeletalMusclePercentage;

  // 体重、体脂肪率、骨格筋率の変化に基づいたアドバイス
  if (weightDiff < 0 && bodyFatDiff < 0 && skeletalMuscleDiff >= 0) {
    message = '素晴らしいです！体重が減少し、体脂肪率も減り、骨格筋率は維持または増加しています。理想的なペースで進んでいますね！';
    trainingMenu = ['高タンパク質の食事を意識', '全身の筋力トレーニング 45分', '有酸素運動 30分'];
  } else if (weightDiff < 0 && bodyFatDiff >= 0 && skeletalMuscleDiff < 0) {
    message = '体重は減少していますが、体脂肪率が増加し、骨格筋率が減少しています。筋肉が落ちている可能性があるので、タンパク質摂取と筋力トレーニングを見直しましょう。';
    trainingMenu = ['筋力トレーニングの強化', '有酸素運動は短めに', 'プロテイン摂取'];
  } else if (weightDiff > 0 && bodyFatDiff < 0 && skeletalMuscleDiff > 0) {
    message = '体重は増加していますが、体脂肪率が減少し、骨格筋率が増加しています。これは筋肉量が増えている良い兆候です！この調子で頑張りましょう。';
    trainingMenu = ['高負荷の筋力トレーニング', '十分な休息と栄養補給', '軽い有酸素運動'];
  } else if (weightDiff > 0 && bodyFatDiff > 0 && skeletalMuscleDiff <= 0) {
    message = '体重が増加し、体脂肪率も増加しています。食事内容と運動習慣を見直す必要があります。';
    trainingMenu = ['食事のカロリーコントロール', '有酸素運動の増加', '筋力トレーニングの継続'];
  } else if (weightDiff === 0 && bodyFatDiff < 0 && skeletalMuscleDiff > 0) {
    message = '体重は変わらないものの、体脂肪率が減少し、骨格筋率が増加しています。これは「ボディコンポジションの変化」で、非常に良い傾向です！';
    trainingMenu = ['現状のトレーニングを継続', '食事の質をさらに向上', '体幹トレーニング'];
  } else if (weightDiff === 0 && bodyFatDiff > 0 && skeletalMuscleDiff < 0) {
    message = '体重は変わらないものの、体脂肪率が増加し、骨格筋率が減少しています。食事内容や運動強度を見直す時期かもしれません。';
    trainingMenu = ['食事内容の見直し（特に糖質・脂質）', '筋力トレーニングのフォーム確認', '有酸素運動の導入'];
  } else if (weightDiff < 0) {
    message = '体重が減少しています。順調なペースです。';
    trainingMenu = ['ウォーキング 30分', '腹筋 20回 x 3セット', 'スクワット 15回 x 3セット'];
  } else if (weightDiff > 0) {
    message = '体重が増加しています。食事内容を見直し、少し運動量を増やしてみましょう。';
    trainingMenu = ['ジョギング 20分', '腕立て伏せ 15回 x 3セット', 'プランク 60秒 x 2セット'];
  } else {
    message = '体重は維持されています。現状維持、またはさらなる目標に向けてトレーニングを調整しましょう。';
    trainingMenu = ['ストレッチ 15分', 'ヨガ 20分', '体幹トレーニング 15分'];
  }

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
