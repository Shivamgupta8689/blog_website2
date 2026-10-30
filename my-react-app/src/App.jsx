import { useState, useMemo } from 'react';
import Login from './components/account/Login';
import DataProvider from './context/DataProvider';
import Home from './components/home/Home';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';
import Update from './components/create/Update';
import About from './components/home/About';
import Contact from './components/home/Contact';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useThemeMode } from './context/ThemeContext';

// ─── Build MUI theme from current mode ───────────────────────────
const buildMuiTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: '#2563eb',
        light: '#3b82f6',
        dark: '#1a3a8a',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
        contrastText: '#ffffff',
      },
      background: {
        default: mode === 'dark' ? '#141d2e' : '#f9fafb',
        paper: mode === 'dark' ? '#1e2a3e' : '#ffffff',
      },
      text: {
        primary: mode === 'dark' ? '#e8eaf0' : '#111827',
        secondary: mode === 'dark' ? '#9daec4' : '#4b5563',
        disabled: mode === 'dark' ? '#5f7899' : '#9ca3af',
      },
      divider: mode === 'dark' ? '#2d3d56' : '#e5e7eb',
      error: { main: '#ef4444' },
      success: { main: '#22c55e' },
    },
    typography: {
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      h1: { fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 800 },
      h2: { fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 700 },
      h3: { fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 700 },
      h4: { fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 700 },
      h5: { fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 600 },
      h6: { fontFamily: "'Poppins', 'Inter', sans-serif", fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 20px',
            boxShadow: 'none',
            '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.18)' },
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)',
          },
          containedSecondary: {
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.mode === 'dark' ? '#1a2436' : '#ffffff',
            '& fieldset': {
              borderColor: theme.palette.mode === 'dark' ? '#2d3d56' : '#e5e7eb',
            },
            '&:hover fieldset': {
              borderColor: theme.palette.mode === 'dark' ? '#4a6080' : '#bfdbfe',
            },
          }),
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.mode === 'dark' ? '#9daec4' : '#6b7280',
          }),
        },
      },
      MuiTextField: {
        defaultProps: { variant: 'outlined' },
      },
      MuiChip: {
        styleOverrides: {
          root: { fontWeight: 600 },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.mode === 'dark' ? '#2d3d56' : '#e5e7eb',
          }),
        },
      },
    },
  });

// ─── Private Route (Sirf authenticated pages par Header + margin lagayega) ───
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <>
      <Header />
      <div style={{ marginTop: 64 }}>
        <Outlet />
      </div>
    </>
  ) : (
    <Navigate replace to='/login' />
  );
};

// ─── App ──────────────────────────────────────────────────────────
function App() {
  // Session storage check taaki page refresh hone par user logout na ho
  const [isAuthenticated, isUserAuthenticated] = useState(
    Boolean(sessionStorage.getItem('accessToken'))
  );
  const { mode } = useThemeMode();

  // Rebuild MUI theme whenever mode changes
  const muiTheme = useMemo(() => buildMuiTheme(mode), [mode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Login Page: Bina Header aur bina top margin ke */}
          <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />

          {/* Protected Routes: In sabhi me Header dikhega aur 64px ka top margin rahega */}
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/details/:id' element={<DetailView />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;