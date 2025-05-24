import React, { useState, useEffect } from 'react';
import { Typography, Paper, Box, Select, MenuItem } from '@mui/material';
import StockChart from '../components/StockChart';
import TimeIntervalSelector from '../components/TimeIntervalSelector';
import LoadingIndicator from '../components/LoadingIndicator';
import { fetchStockData } from '../services/api';

const StockPage = () => {
  const [timeInterval, setTimeInterval] = useState(30);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchStockData(selectedStock, timeInterval);
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
    
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, [selectedStock, timeInterval]);

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Stock Price Analysis
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TimeIntervalSelector interval={timeInterval} onChange={setTimeInterval} />
        <Select
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
          size="small"
          sx={{ minWidth: 120 }}
        >
          <MenuItem value="AAPL">Apple</MenuItem>
          <MenuItem value="GOOGL">Google</MenuItem>
          <MenuItem value="MSFT">Microsoft</MenuItem>
          <MenuItem value="AMZN">Amazon</MenuItem>
          <MenuItem value="TSLA">Tesla</MenuItem>
        </Select>
      </Box>
      
      {loading ? (
        <LoadingIndicator />
      ) : (
        <StockChart data={stockData} timeInterval={timeInterval} />
      )}
    </Paper>
  );
};

export default StockPage;