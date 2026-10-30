import React, { useContext } from 'react';
import {
  Box, Button, Typography, Chip, Divider,
  styled, useMediaQuery, useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CampaignIcon from '@mui/icons-material/Campaign';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AppsIcon from '@mui/icons-material/Apps';
import { categories } from '../../constants/data';
import { Link, useSearchParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';

// ─── Category → icon + color ────────────────────────────────────────
const categoryMeta = {
  'Notice':       { icon: <NotificationsIcon fontSize="small" />, color: '#1e40af', bg: '#dbeafe' },
  'Announcement': { icon: <CampaignIcon fontSize="small" />,       color: '#9d174d', bg: '#fce7f3' },
  'Schedules':    { icon: <EventIcon fontSize="small" />,           color: '#065f46', bg: '#d1fae5' },
  'Alumini':      { icon: <PeopleIcon fontSize="small" />,          color: '#92400e', bg: '#fef3c7' },
  'Events':       { icon: <EmojiEventsIcon fontSize="small" />,     color: '#5b21b6', bg: '#ede9fe' },
};

// ─── Styled ────────────────────────────────────────────────────────
const SidebarWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '20px 14px',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: '14px 12px',
    gap: 8,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const CreateBlogBtn = styled(Button)`
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: #ffffff;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(245,158,11,0.35);
  transition: all 0.25s;
  &:hover {
    box-shadow: 0 6px 18px rgba(245,158,11,0.5);
    transform: translateY(-1px);
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  }
`;

// ─── Component ─────────────────────────────────────────────────────
const Categories = () => {
  const { account } = useContext(DataContext);
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = theme.palette.mode === 'dark';

  const isActive = (name) => activeCategory === name;
  const isAll = () => !activeCategory;

  // Chip colors adapt to dark mode
  const inactiveChipSx = {
    fontWeight: 600,
    bgcolor: isDark ? theme.palette.action.hover : '#f3f4f6',
    color: isDark ? theme.palette.text.secondary : '#374151',
    '& .MuiChip-icon': { color: isDark ? theme.palette.text.secondary : '#374151' },
  };
  const activeChipSx = {
    fontWeight: 600,
    bgcolor: '#1a3a8a',
    color: '#fff',
    '& .MuiChip-icon': { color: '#fff' },
  };

  if (isMobile) {
    return (
      <SidebarWrapper>
        {account?.user_type === 'Teacher' && (
          <Box sx={{ width: '100%', mb: 1 }}>
            <CreateBlogBtn
              component={Link}
              to={`/create?category=${activeCategory}`}
              startIcon={<AddIcon />}
              fullWidth
              variant="contained"
            >
              Create Blog
            </CreateBlogBtn>
          </Box>
        )}
        <Chip
          icon={<AppsIcon />}
          label="All"
          component={Link}
          to="/"
          clickable
          sx={isAll() ? activeChipSx : inactiveChipSx}
        />
        {categories.map((cat) => {
          const meta = categoryMeta[cat.name] || {};
          const active = isActive(cat.name);
          return (
            <Chip
              key={cat.id}
              icon={meta.icon}
              label={cat.name}
              component={Link}
              to={`/?category=${cat.name}`}
              clickable
              sx={active
                ? activeChipSx
                : { ...inactiveChipSx, '& .MuiChip-icon': { color: meta.color } }
              }
            />
          );
        })}
      </SidebarWrapper>
    );
  }

  // Desktop vertical sidebar
  return (
    <SidebarWrapper sx={{ position: 'sticky', top: 80 }}>
      {account?.user_type === 'Teacher' && (
        <>
          <CreateBlogBtn
            component={Link}
            to={`/create?category=${activeCategory}`}
            startIcon={<AddIcon />}
            fullWidth
            variant="contained"
          >
            Create Blog
          </CreateBlogBtn>
          <Divider />
        </>
      )}

      <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: 'text.disabled', letterSpacing: '0.08em', textTransform: 'uppercase', px: 1, mb: 0.5 }}>
        Categories
      </Typography>

      <CategoryItem icon={<AppsIcon sx={{ fontSize: 18 }} />} label="All Posts" to="/" active={isAll()} color="#1a3a8a" bg="#dbeafe" isDark={isDark} theme={theme} />

      {categories.map((cat) => {
        const meta = categoryMeta[cat.name] || { icon: <AppsIcon sx={{ fontSize: 18 }} />, color: '#374151', bg: '#f3f4f6' };
        return (
          <CategoryItem
            key={cat.id}
            icon={React.cloneElement(meta.icon, { sx: { fontSize: 18 } })}
            label={cat.name}
            to={`/?category=${cat.name}`}
            active={isActive(cat.name)}
            color={meta.color}
            bg={meta.bg}
            isDark={isDark}
            theme={theme}
          />
        );
      })}
    </SidebarWrapper>
  );
};

// ─── Individual Category Item ────────────────────────────────────────
const CategoryItem = ({ icon, label, to, active, color, bg, isDark, theme }) => (
  <Box
    component={Link}
    to={to}
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1.5,
      px: 1.5,
      py: 1,
      borderRadius: 2,
      textDecoration: 'none',
      fontWeight: active ? 700 : 500,
      fontSize: '0.88rem',
      color: active ? '#ffffff' : (isDark ? theme.palette.text.secondary : '#374151'),
      background: active
        ? 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)'
        : 'transparent',
      transition: 'all 0.2s',
      '&:hover': {
        background: active
          ? 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)'
          : (isDark ? 'rgba(37,99,235,0.12)' : bg),
        color: active ? '#ffffff' : color,
      },
    }}
  >
    <Box
      sx={{
        width: 32, height: 32, borderRadius: 1.5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'rgba(255,255,255,0.2)' : (isDark ? 'rgba(255,255,255,0.07)' : bg),
        color: active ? '#ffffff' : color,
        flexShrink: 0,
        transition: 'all 0.2s',
      }}
    >
      {icon}
    </Box>
    {label}
  </Box>
);

export default Categories;
