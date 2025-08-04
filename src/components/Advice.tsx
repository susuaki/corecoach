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
    message = '素晴らしい変化です！体重が減り、体脂肪率も減少、さらに骨格筋率は維持または増加しています。理想的なボディメイクが進んでいますね！';
    trainingMenu = ['高タンパク質・低脂質の食事を継続', '全身の筋力トレーニング（週2〜3回）', '有酸素運動（ウォーキング、ジョギングなど）30分'];
  } else if (weightDiff < 0 && bodyFatDiff >= 0 && skeletalMuscleDiff < 0) {
    message = '体重は減少傾向ですが、体脂肪率が増加し、骨格筋率が減少しています。これは筋肉が落ちているサインかもしれません。タンパク質摂取量を増やし、筋力トレーニングの内容を見直しましょう。';
    trainingMenu = ['筋力トレーニングの負荷・回数を見直し', '有酸素運動は短時間・高強度に', 'プロテインやBCAAの積極的な摂取'];
  } else if (weightDiff > 0 && bodyFatDiff < 0 && skeletalMuscleDiff > 0) {
    message = '体重は増えていますが、体脂肪率が減少し、骨格筋率が増加しています。これは筋肉量が増えている証拠です！健康的で力強い体づくりが進んでいますね。';
    trainingMenu = ['高負荷の筋力トレーニングを継続', '十分な栄養と休息を確保', '軽い有酸素運動でリカバリー'];
  } else if (weightDiff > 0 && bodyFatDiff > 0 && skeletalMuscleDiff <= 0) {
    message = '体重と体脂肪率が増加傾向にあります。食事内容と運動習慣を一度見直す良い機会かもしれません。';
    trainingMenu = ['食事のカロリーとPFCバランスを見直し', '有酸素運動の頻度と時間を増やす', '筋力トレーニングで基礎代謝アップ'];
  } else if (weightDiff === 0 && bodyFatDiff < 0 && skeletalMuscleDiff > 0) {
    message = '体重は変わらないものの、体脂肪率が減り、骨格筋率が増加しています。まさに「隠れ肥満」解消の理想的な変化です！この調子でボディコンポジションを改善していきましょう。';
    trainingMenu = ['現在のトレーニングと食事を継続', '体幹トレーニングで姿勢改善', '質の良い睡眠を心がける'];
  } else if (weightDiff === 0 && bodyFatDiff > 0 && skeletalMuscleDiff < 0) {
    message = '体重は横ばいですが、体脂肪率が増加し、骨格筋率が減少しています。食事内容や運動の質を見直す時期かもしれません。';
    trainingMenu = ['糖質・脂質の摂取量を見直し', '筋力トレーニングのフォームと強度を確認', '軽い有酸素運動を取り入れる'];
  } else if (weightDiff < 0) {
    message = '体重が減少していますね。順調なペースです。';
    trainingMenu = ['ウォーキング 30分', '腹筋 20回 x 3セット', 'スクワット 15回 x 3セット'];
  } else if (weightDiff > 0) {
    message = '体重が増加傾向です。食事内容や運動量を見直してみましょう。';
    trainingMenu = ['ジョギング 20分', '腕立て伏せ 15回 x 3セット', 'プランク 60秒 x 2セット'];
  } else {
    message = '体重は安定していますね。現状維持、または次の目標に向けてトレーニングを調整しましょう。';
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
