import React from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      alignItems="center" 
      justifyContent="center" 
      height="200px"
    >
      <CircularProgress />
      <Typography variant="body1" mt={2}>Loading data...</Typography>
    </Box>
  );
};

export default LoadingIndicator;