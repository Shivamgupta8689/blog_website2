import React, { useState, useContext } from 'react';
import {
  AppBar, Toolbar, Typography, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText,
  useMediaQuery, useTheme as useMuiTheme, Divider, Tooltip, styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link, useLocation } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import { useThemeMode } from '../../context/ThemeContext';

// ─── Styled ────────────────────────────────────────────────────────
const StyledAppBar = styled(AppBar)`
  background: var(--color-navbar-bg);
  box-shadow: 0 2px 12px rgba(13, 43, 110, 0.35);
  height: 64px;
  justify-content: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: white;
  flex: 1;
`;

const NavLink = styled(Link)`
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  padding: 6px 14px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover { color: #ffffff; background: rgba(255,255,255,0.12); }
  &.active { color: #fbbf24; background: rgba(251,191,36,0.15); font-weight: 600; }
`;

const LogoutBtn = styled(Button)`
  background: rgba(245,158,11,0.15);
  color: #fbbf24;
  border: 1px solid rgba(251,191,36,0.4);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 5px 14px;
  margin-left: 6px;
  &:hover { background: rgba(245,158,11,0.28); border-color: #fbbf24; box-shadow: none; }
`;

// ─── Nav items ─────────────────────────────────────────────────────
const navItems = [
  { label: 'Home',    path: '/' },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
];

// ─── Component ─────────────────────────────────────────────────────
const Header = () => {
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const location  = useLocation();
  const { setAccount } = useContext(DataContext);
  const { mode, toggleTheme, isDark } = useThemeMode();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    setAccount({ user_type: '', username: '', name: '' });
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.location.href = '/login';
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  // Theme toggle button (shared between desktop and mobile)
  const ThemeToggle = () => (
    <Tooltip title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}>
      <IconButton
        onClick={toggleTheme}
        size="small"
        aria-label="Toggle theme"
        sx={{
          color: 'rgba(255,255,255,0.85)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: 2,
          p: '5px',
          transition: 'all 0.2s',
          '&:hover': { background: 'rgba(255,255,255,0.12)', color: '#fbbf24', borderColor: '#fbbf24' },
        }}
      >
        {isDark
          ? <LightModeIcon sx={{ fontSize: 18 }} />
          : <DarkModeIcon  sx={{ fontSize: 18 }} />
        }
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ px: { xs: 2, md: 3 }, gap: 1 }}>
          {/* Logo */}
          <LogoLink to="/">
            <SchoolIcon sx={{ fontSize: 28, color: '#fbbf24', flexShrink: 0 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <Typography sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: { xs: '0.85rem', sm: '1rem' }, color: '#fff', lineHeight: 1.1 }}>
                LTCE Blog
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.58rem', sm: '0.63rem' }, color: 'rgba(255,255,255,0.6)', display: { xs: 'none', sm: 'block' }, lineHeight: 1 }}>
                Lokmanya Tilak College of Engineering
              </Typography>
            </Box>
          </LogoLink>

          {/* Desktop Nav */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {navItems.map(item => (
                <NavLink key={item.path} to={item.path} className={isActive(item.path) ? 'active' : ''}>
                  {item.label}
                </NavLink>
              ))}
              <ThemeToggle />
              <LogoutBtn onClick={handleLogout} startIcon={<LogoutIcon sx={{ fontSize: '1rem' }} />}>
                Logout
              </LogoutBtn>
            </Box>
          )}

          {/* Mobile: theme toggle + hamburger */}
          {isMobile && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <ThemeToggle />
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'white' }} aria-label="Open menu">
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { width: 260, background: isDark ? '#0f1e33' : '#0d2b6e' } }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SchoolIcon sx={{ color: '#fbbf24', fontSize: 22 }} />
            <Typography sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
              LTCE Blog
            </Typography>
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'rgba(255,255,255,0.7)' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />

        <List sx={{ pt: 1 }}>
          {navItems.map(item => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 3, py: 1.5, borderRadius: 2, mx: 1, my: 0.5,
                  background: isActive(item.path) ? 'rgba(251,191,36,0.15)' : 'transparent',
                  '&:hover': { background: 'rgba(255,255,255,0.08)' },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      color: isActive(item.path) ? '#fbbf24' : 'rgba(255,255,255,0.85)',
                      fontWeight: isActive(item.path) ? 700 : 500,
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mt: 1 }} />

        <Box sx={{ px: 2, pt: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={() => { setDrawerOpen(false); handleLogout(); }}
            sx={{ color: '#fbbf24', borderColor: 'rgba(251,191,36,0.5)', '&:hover': { borderColor: '#fbbf24', background: 'rgba(251,191,36,0.12)' } }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
