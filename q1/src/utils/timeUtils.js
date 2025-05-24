export const formatTime = (timestamp, interval) => {
  const date = new Date(timestamp);
  if (interval <= 60) {
    return date.toLocaleTimeString();
  }
  return date.toLocaleString();
};

export const getTimeIntervals = () => {
  return [
    { value: 5, label: 'Last 5 minutes' },
    { value: 15, label: 'Last 15 minutes' },
    { value: 30, label: 'Last 30 minutes' },
    { value: 60, label: 'Last hour' },
    { value: 180, label: 'Last 3 hours' },
    { value: 360, label: 'Last 6 hours' },
    { value: 720, label: 'Last 12 hours' },
    { value: 1440, label: 'Last 24 hours' }
  ];
};