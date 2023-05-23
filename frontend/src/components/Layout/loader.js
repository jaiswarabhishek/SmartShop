import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
        <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
    </div>
  );
};

export default Loader;
