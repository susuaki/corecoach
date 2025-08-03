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
      const updatedData = [...healthData, newData];
      setHealthData(updatedData);
      localStorage.setItem('healthData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to save health data to local storage', error);
    }
  };

  const importHealthData = (data: HealthData[]) => {
    try {
      setHealthData(data);
      localStorage.setItem('healthData', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to import health data to local storage', error);
    }
  };

  return { healthData, addHealthData, importHealthData };
};
