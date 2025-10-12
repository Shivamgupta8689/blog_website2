import React from 'react'
import Banner from '../banner/Banner';
import Categories from './Categories';
import { Grid, Box } from '@mui/material'; 
import Posts from './Posts';

const Home = () => {
  return (
    <>
      <Banner />
      
      <Grid container sx={{ width: '100%' }}>
        {/* Categories - Right side on desktop, Full width on mobile */}
        <Grid 
          item 
          lg={2} 
          md={3}
          sm={12}
          xs={12}
          sx={{
            order: { xs: 1, sm: 1, md: 1, lg: 2 }
          }}
        >
          <Categories />
        </Grid>

        {/* Posts - Left side on desktop, Full width below on mobile */}
        <Grid 
          container 
          item 
          lg={10} 
          md={9}
          sm={12}
          xs={12}
          sx={{
            order: { xs: 2, sm: 2, md: 2, lg: 1 }
          }}
        >
          <Posts />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
