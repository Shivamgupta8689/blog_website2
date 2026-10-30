import { Box, Typography, styled, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

const BannerImage = styled(Box)`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  background-image: url('https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center 30%;

  @media (max-width: 600px) {
    height: 260px;
  }
`;

const Overlay = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  gap: 12px;
`;

const CollegeTitle = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 16px rgba(0,0,0,0.7), 0 0px 40px rgba(0,0,0,0.5);
  letter-spacing: -0.01em;
  line-height: 1.15;
  max-width: 820px;
`;

const Tagline = styled(Box)`
  background: rgba(245, 158, 11, 0.85);
  backdrop-filter: blur(4px);
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.88rem;
  padding: 6px 18px;
  border-radius: 100px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const Banner = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <BannerImage>
      {/* Gradient overlay — darker in dark mode */}
      <Box sx={{
        position: 'absolute', inset: 0,
        background: isDark
          ? 'linear-gradient(to bottom, rgba(5,12,26,0.55) 0%, rgba(5,12,26,0.82) 100%)'
          : 'linear-gradient(to bottom, rgba(13,27,78,0.45) 0%, rgba(13,27,78,0.78) 100%)',
        transition: 'background 0.3s ease',
      }} />

      <Overlay>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SchoolIcon sx={{ color: '#fbbf24', fontSize: { xs: 28, sm: 36 } }} />
          <CollegeTitle variant="h2" sx={{ fontSize: { xs: '1.4rem', sm: '2rem', md: '2.6rem' } }}>
            Lokmanya Tilak College of Engineering
          </CollegeTitle>
        </Box>
        <Tagline>Official Blog &amp; Notice Portal</Tagline>
      </Overlay>
    </BannerImage>
  );
};

export default Banner;
