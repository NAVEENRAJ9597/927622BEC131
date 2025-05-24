export const calculateStats = (pricesData) => {
  const stats = {};
  
  Object.entries(pricesData).forEach(([symbol, prices]) => {
    if (!prices || prices.length === 0) {
      stats[symbol] = { average: 0, stdDev: 0 };
      return;
    }
    
    const sum = prices.reduce((acc, { price }) => acc + price, 0);
    const average = sum / prices.length;
    
    const squaredDiffs = prices.map(({ price }) => Math.pow(price - average, 2));
    const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / prices.length;
    const stdDev = Math.sqrt(variance);
    
    stats[symbol] = { average, stdDev };
  });
  
  return stats;
};

export const calculateCorrelation = (pricesA, pricesB) => {
  if (!pricesA || !pricesB || pricesA.length === 0 || pricesB.length === 0) {
    return 0;
  }
  
  // Align timestamps
  const priceMapA = new Map(pricesA.map(p => [p.timestamp, p.price]));
  const priceMapB = new Map(pricesB.map(p => [p.timestamp, p.price]));
  
  const commonTimestamps = [...new Set([
    ...pricesA.map(p => p.timestamp),
    ...pricesB.map(p => p.timestamp)
  ])].filter(ts => priceMapA.has(ts) && priceMapB.has(ts));
  
  if (commonTimestamps.length === 0) return 0;
  
  const alignedPairs = commonTimestamps.map(ts => ({
    a: priceMapA.get(ts),
    b: priceMapB.get(ts)
  }));
  
  const meanA = alignedPairs.reduce((sum, { a }) => sum + a, 0) / alignedPairs.length;
  const meanB = alignedPairs.reduce((sum, { b }) => sum + b, 0) / alignedPairs.length;
  
  let covariance = 0;
  let stdDevA = 0;
  let stdDevB = 0;
  
  alignedPairs.forEach(({ a, b }) => {
    covariance += (a - meanA) * (b - meanB);
    stdDevA += Math.pow(a - meanA, 2);
    stdDevB += Math.pow(b - meanB, 2);
  });
  
  covariance /= alignedPairs.length;
  stdDevA = Math.sqrt(stdDevA / alignedPairs.length);
  stdDevB = Math.sqrt(stdDevB / alignedPairs.length);
  
  if (stdDevA === 0 || stdDevB === 0) return 0;
  
  return covariance / (stdDevA * stdDevB);
};