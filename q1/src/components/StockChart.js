import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const StockChart = ({ data, timeInterval }) => {
  if (!data || !data.prices) return null;

  const averagePrice = data.prices.reduce((sum, point) => sum + point.price, 0) / data.prices.length;

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem);
    if (timeInterval <= 60) {
      return date.toLocaleTimeString();
    }
    return date.toLocaleString();
  };

  return (
    <Box sx={{ height: '500px' }}>
      <Typography variant="h6" gutterBottom>
        {data.symbol} - Last {timeInterval} minutes
      </Typography>
      
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data.prices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip 
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={(value) => `Time: ${formatXAxis(value)}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            name="Price"
          />
          <ReferenceLine 
            y={averagePrice} 
            label={`Avg $${averagePrice.toFixed(2)}`} 
            stroke="#ff7300" 
            strokeDasharray="3 3" 
          />
        </LineChart>
      </ResponsiveContainer>
      
      <Box sx={{ mt: 2 }}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle1">Summary</Typography>
          <Typography>Current: ${data.prices[data.prices.length - 1].price.toFixed(2)}</Typography>
          <Typography>Average: ${averagePrice.toFixed(2)}</Typography>
          <Typography>Min: ${Math.min(...data.prices.map(p => p.price)).toFixed(2)}</Typography>
          <Typography>Max: ${Math.max(...data.prices.map(p => p.price)).toFixed(2)}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StockChart;