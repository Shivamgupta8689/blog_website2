import React from 'react'
import Banner from '../banner/Banner';
import Categories from './Categories';
import { Grid } from '@mui/material'; 
import Posts from './Posts';

const Home = () => {
  return (
    <>
      <Banner />
      
      <Grid container sx={{ width: '100%' }}>
        {/* Categories - Left side on desktop, Full width on mobile */}
        <Grid 
          item 
          lg={2} 
          sm={12}
          xs={12}
        >
          <Categories />
        </Grid>

        {/* Posts - Right side on desktop, Full width on mobile (2 per row) */}
        <Grid 
          container 
          item 
          lg={10} 
          sm={12}
          xs={12}
          spacing={2}
        >
          <Posts />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
