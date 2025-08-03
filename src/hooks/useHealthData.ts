import { useState, useEffect } from 'react';
import { HealthData } from '../types/HealthData';

export const useHealthData = () => {
  const [healthData, setHealthData] = useState<HealthData[]>([]);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('healthData');
      if (savedData) {
        setHealthData(JSON.parse(savedData));
      }
    } catch (error) {
      console.error('Failed to load health data from local storage', error);
    }
  }, []);

  const addHealthData = (newData: HealthData) => {
    try {
      // データを追加する際に日付でソートする
      const updatedData = [...healthData, newData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setHealthData(updatedData);
      localStorage.setItem('healthData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to save health data to local storage', error);
    }
  };

  const deleteHealthData = (date: string) => {
    try {
      const updatedData = healthData.filter(d => d.date !== date);
      setHealthData(updatedData);
      localStorage.setItem('healthData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to delete health data from local storage', error);
    }
  };

  const importHealthData = (importedData: any) => {
    try {
      if (!Array.isArray(importedData)) {
        throw new Error('Imported data is not an array.');
      }

      const validatedData: HealthData[] = importedData.map((item: any) => {
        // 古いデータ形式（skeletalMuscleMass）との互換性を保つ
        const skeletalMuscle = item.skeletalMusclePercentage ?? item.skeletalMuscleMass;
        
        const newItem: HealthData = {
          date: item.date,
          weight: Number(item.weight || 0),
          bodyFatPercentage: Number(item.bodyFatPercentage || 0),
          skeletalMusclePercentage: Number(skeletalMuscle || 0),
          basalMetabolism: Number(item.basalMetabolism || 0),
        };

        // 必須のdateフィールドが存在するかチェック
        if (!newItem.date || typeof newItem.date !== 'string') {
            console.warn('Skipping record with missing or invalid date:', item);
            return null;
        }
        return newItem;
      }).filter((item): item is HealthData => item !== null); // nullを除外

      if (validatedData.length < importedData.length) {
          alert('一部のデータが無効もしくは日付がなかったため、スキップされました。');
      }

      // 既存データとマージして重複をなくす（インポートされたデータを優先）
      const mergedData = [...healthData];
      validatedData.forEach(newItem => {
          const index = mergedData.findIndex(existingItem => existingItem.date === newItem.date);
          if (index !== -1) {
              mergedData[index] = newItem; // 既存のデータを上書き
          } else {
              mergedData.push(newItem); // 新しいデータを追加
          }
      });

      const sortedData = mergedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      setHealthData(sortedData);
      localStorage.setItem('healthData', JSON.stringify(sortedData));
      alert('データが正常にインポートされました。');
    } catch (error) {
      console.error('Failed to import health data:', error);
      alert('データのインポートに失敗しました。ファイルの形式が正しくない可能性があります。');
    }
  };

  return { healthData, addHealthData, deleteHealthData, importHealthData };
};