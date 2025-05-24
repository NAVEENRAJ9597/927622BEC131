import React from 'react';
import { Box, Typography, Paper, Tooltip } from '@mui/material';
import { HeatMapGrid } from 'react-heatmap-grid';
import { calculateStats } from '../utils/calculations';

const CorrelationHeatmap = ({ data, timeInterval }) => {
  if (!data || !data.correlations) return null;

  const stocks = Object.keys(data.correlations);
  const matrix = stocks.map(stock1 => 
    stocks.map(stock2 => data.correlations[stock1][stock2])
  );

  const stats = calculateStats(data.prices);

  const cellRender = (value, rowIndex, columnIndex) => {
    const stock1 = stocks[rowIndex];
    const stock2 = stocks[columnIndex];
    
    return (
      <Tooltip title={
        <div>
          <div>{stock1} vs {stock2}</div>
          <div>Correlation: {value.toFixed(2)}</div>
          <div>---</div>
          <div>{stock1} stats (last {timeInterval} mins):</div>
          <div>Avg: ${stats[stock1]?.average.toFixed(2)}</div>
          <div>Std Dev: ${stats[stock1]?.stdDev.toFixed(2)}</div>
          <div>---</div>
          <div>{stock2} stats (last {timeInterval} mins):</div>
          <div>Avg: ${stats[stock2]?.average.toFixed(2)}</div>
          <div>Std Dev: ${stats[stock2]?.stdDev.toFixed(2)}</div>
        </div>
      }>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: getColorForValue(value),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: getTextColor(value),
          fontWeight: 'bold'
        }}>
          {value.toFixed(2)}
        </div>
      </Tooltip>
    );
  };

  const getColorForValue = (value) => {
    if (value < -0.7) return '#d73027';
    if (value < -0.3) return '#fc8d59';
    if (value < 0) return '#fee090';
    if (value === 0) return '#ffffff';
    if (value < 0.3) return '#e0f3f8';
    if (value < 0.7) return '#91bfdb';
    return '#4575b4';
  };

  const getTextColor = (value) => {
    return Math.abs(value) > 0.5 ? 'white' : 'black';
  };

  return (
    <Box sx={{ height: '600px' }}>
      <Typography variant="h6" gutterBottom>
        Correlation Matrix (Last {timeInterval} minutes)
      </Typography>
      
      <Box sx={{ height: '500px', overflow: 'auto' }}>
        <HeatMapGrid
          data={matrix}
          xLabels={stocks}
          yLabels={stocks}
          cellRender={cellRender}
          xLabelsStyle={(index) => ({
            color: '#333',
            fontSize: '0.8rem'
          })}
          yLabelsStyle={() => ({
            color: '#333',
            fontSize: '0.8rem',
            textAlign: 'right'
          })}
          cellHeight="2rem"
          xLabelsPos="bottom"
        />
      </Box>
      
      <Box sx={{ mt: 2 }}>
        <Paper elevation={1} sx={{ p: 2 }}>
          <Typography variant="subtitle1">Color Legend</Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: 1, flexWrap: 'wrap' }}>
            {['Strong Negative', 'Negative', 'Weak Negative', 'Neutral', 
              'Weak Positive', 'Positive', 'Strong Positive'].map((label, i) => (
              <Box key={label} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: getColorForValue(-0.8 + i * 0.27),
                  mr: 1
                }} />
                <Typography variant="caption">{label}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default CorrelationHeatmap;