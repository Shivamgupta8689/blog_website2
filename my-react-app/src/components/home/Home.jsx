import React from 'react'
import Banner from '../banner/Banner';
import Categories from './Categories';
import { Grid, Box, useMediaQuery, useTheme } from '@mui/material'; 
import Posts from './Posts';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Banner />
      
      {isMobile ? (
        // Mobile Layout - Categories Full Width, Posts below
        <Box sx={{ width: '100%', padding: '0 0' }}>
          <Grid item xs={12} sx={{ width: '100%' }}>
            <Categories />
          </Grid>
          <Grid 
            container 
            spacing={1}
            sx={{
              width: '100%',
              padding: '0 8px',
              margin: 0
            }}
          >
            <Posts />
          </Grid>
        </Box>
      ) : (
        // Desktop/Tablet Layout - Original 2 column
        <Grid container sx={{ width: '100%' }}>
          <Grid item lg={2} sm={2} xs={12}>
            <Categories />
          </Grid>
          <Grid container item lg={10} sm={10} xs={12}>
            <Posts />
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Home
