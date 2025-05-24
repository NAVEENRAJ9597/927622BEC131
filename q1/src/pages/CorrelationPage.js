import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box } from '@mui/material';
import CorrelationHeatmap from '../components/CorrelationHeatmap';
import TimeIntervalSelector from '../components/TimeIntervalSelector';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchCorrelationData } from '../services/api';

const CorrelationPage = () => {
  const [timeInterval, setTimeInterval] = useState(30);
  const [correlationData, setCorrelationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchCorrelationData(timeInterval);
        setCorrelationData(data);
      } catch (error) {
        console.error('Error fetching correlation data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [timeInterval]);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stock Correlation Heatmap
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TimeIntervalSelector interval={timeInterval} onChange={setTimeInterval} />
      </Box>
      
      {loading ? (
        <LoadingIndicator />
      ) : (
        <CorrelationHeatmap data={correlationData} timeInterval={timeInterval} />
      )}
    </Paper>
  );
};

export default CorrelationPage;