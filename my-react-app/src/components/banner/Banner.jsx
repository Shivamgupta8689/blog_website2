/ Banner.jsx - RESPONSIVE
import React from 'react'
import { Box, Typography, styled, useTheme, useMediaQuery } from '@mui/material';

const Image = styled(Box)(({ theme }) => `
    background: url(https://ltce.in/images/about-video1.jpg) center/55% repeat-x #000;
    background-size: cover;
    background-attachment: fixed;
    width: 100%;
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
    
    ${theme.breakpoints.up('lg')} {
        height: 50vh;
        padding: 40px 20px;
    }
    
    ${theme.breakpoints.between('sm', 'lg')} {
        min-height: 45vh;
        padding: 30px 20px;
    }
    
    ${theme.breakpoints.down('sm')} {
        min-height: 40vh;
        padding: 25px 15px;
    }
    
    @media (max-width: 400px) {
        min-height: 35vh;
        padding: 20px 10px;
    }
`);

const Heading = styled(Typography)(({ theme }) => `
    font-size: 70px;
    color: #FFFFFF;
    line-height: 1;
    font-weight: 700;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
    
    ${theme.breakpoints.up('lg')} {
        font-size: 70px;
        margin-bottom: 25px;
    }
    
    ${theme.breakpoints.between('sm', 'lg')} {
        font-size: 50px;
        margin-bottom: 20px;
    }
    
    ${theme.breakpoints.down('sm')} {
        font-size: 36px;
        margin-bottom: 15px;
    }
    
    @media (max-width: 400px) {
        font-size: 28px;
        margin-bottom: 12px;
        line-height: 1.2;
    }
`);

const Subheading = styled(Typography)(({ theme }) => `
    font-size: 20px;
    background: #FFFFFF;
    color: #000;
    padding: 12px 20px;
    border-radius: 4px;
    text-align: center;
    font-weight: 500;
    max-width: 600px;
    
    ${theme.breakpoints.up('lg')} {
        font-size: 20px;
        padding: 15px 25px;
    }
    
    ${theme.breakpoints.between('sm', 'lg')} {
        font-size: 18px;
        padding: 12px 20px;
    }
    
    ${theme.breakpoints.down('sm')} {
        font-size: 16px;
        padding: 10px 15px;
    }
    
    @media (max-width: 400px) {
        font-size: 14px;
        padding: 8px 12px;
    }
`);

const Banner = () => {
  return (
    <Image>
        <Heading>Welcome to LTCE Blog</Heading>
        <Subheading>Learn, Teach, and Collaborate with Excellence</Subheading>
    </Image>
  )
}

export default Banner
