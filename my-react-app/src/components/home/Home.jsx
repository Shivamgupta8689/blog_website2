import React from 'react'
import Banner from '../banner/Banner';
import Categories from './Categories';
import { Grid, Container, Box, useMediaQuery, useTheme } from '@mui/material'; 
import Posts from './Posts';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Banner />
      <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          {/* Categories Sidebar */}
          <Grid 
            item 
            lg={2} 
            md={3}
            sm={12}
            xs={12}
            sx={{
              order: { xs: 2, sm: 2, md: 1, lg: 1 },
              borderRight: { lg: '1px solid #e0e0e0', md: 'none', sm: 'none', xs: 'none' }
            }}
          >
            <Categories />
          </Grid>

          {/* Posts Grid */}
          <Grid 
            container 
            item 
            lg={10} 
            md={9}
            sm={12}
            xs={12}
            spacing={{ lg: 2, md: 2, sm: 2, xs: 1 }}
            sx={{
              order: { xs: 1, sm: 1, md: 2, lg: 2 },
            }}
          >
            <Posts />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Home
