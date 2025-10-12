import React from 'react'
import Banner from '../banner/Banner';
import Categories from './Categories';
import { Grid, useTheme, useMediaQuery } from '@mui/material'; 
import Posts from './Posts';

const Home = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            <Banner />
            
            {isMobile ? (
                // MOBILE VIEW: Categories upar full width, Posts niche 2 per row
                <Grid container sx={{ width: '100%', padding: 0, margin: 0 }}>
                    <Grid item xs={12} sx={{ width: '100%', padding: 0 }}>
                        <Categories />
                    </Grid>
                    <Grid 
                        container 
                        item 
                        xs={12}
                        sx={{ 
                            width: '100%', 
                            padding: '8px',
                            margin: 0
                        }}
                    >
                        <Posts />
                    </Grid>
                </Grid>
            ) : (
                // DESKTOP VIEW: Categories left, Posts right (4 per row)
                <Grid container sx={{ width: '100%', padding: 0, margin: 0 }}>
                    <Grid item lg={2} sx={{ width: '20%' }}>
                        <Categories />
                    </Grid>
                    <Grid 
                        container 
                        item 
                        lg={10}
                        sx={{ 
                            width: '80%',
                            padding: '8px',
                            margin: 0
                        }}
                    >
                        <Posts />
                    </Grid>
                </Grid>
            )}
        </>
    )
}

export default Home
