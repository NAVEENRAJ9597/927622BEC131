import axios from 'axios';

// Mock data for demonstration
const mockStockData = {
  AAPL: {
    symbol: 'AAPL',
    prices: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 60000,
      price: 150 + Math.sin(i/2) * 5 + Math.random() * 2
    }))
  },
  // Add more mock data for other stocks...
};

const mockCorrelationData = {
  correlations: {
    AAPL: { AAPL: 1, GOOGL: 0.7, MSFT: 0.6, AMZN: 0.4, TSLA: 0.2 },
    GOOGL: { AAPL: 0.7, GOOGL: 1, MSFT: 0.5, AMZN: 0.3, TSLA: 0.1 },
    MSFT: { AAPL: 0.6, GOOGL: 0.5, MSFT: 1, AMZN: 0.8, TSLA: 0.3 },
    AMZN: { AAPL: 0.4, GOOGL: 0.3, MSFT: 0.8, AMZN: 1, TSLA: 0.5 },
    TSLA: { AAPL: 0.2, GOOGL: 0.1, MSFT: 0.3, AMZN: 0.5, TSLA: 1 }
  },
  prices: {
    AAPL: mockStockData.AAPL.prices,
    GOOGL: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 60000,
      price: 2800 + Math.sin(i/3) * 50 + Math.random() * 20
    })),
    // Add more price data for other stocks...
  }
};

// Simulate API calls with mock data
export const fetchStockData = async (symbol, minutes) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockStockData[symbol] || mockStockData.AAPL);
    }, 500);
  });
};

export const fetchCorrelationData = async (minutes) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockCorrelationData);
    }, 800);
  });
};