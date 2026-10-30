import React from 'react';
import Banner from '../banner/Banner';
import Categories from './Categories';
import { Box, Grid } from '@mui/material';
import Posts from './Posts';

const Home = () => {
  return (
    <>
      <Banner />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          width: '100%',
          px: { xs: 1, sm: 2 },
          py: 2,
          boxSizing: 'border-box',
        }}
      >
        {/* Left Sidebar: Fixed Clean Width bina kisi faltu gap ke */}
        <Box
          sx={{
            width: { xs: '100%', md: '210px', lg: '230px' },
            flexShrink: 0,
            mr: { xs: 0, md: 2 }, // Sirf 16px ka controlled gap sidebar aur cards ke beech
            mb: { xs: 2, md: 0 },
          }}
        >
          <Categories />
        </Box>

        {/* Right Section: Posts Card Container */}
        <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
          <Grid container spacing={2}>
            <Posts />
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Home;