import React, { useState, useContext } from 'react';
import {
  Box, TextField, Button, Typography, MenuItem,
  InputAdornment, IconButton, CircularProgress,
  styled, useTheme as useMuiTheme,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import SchoolIcon from '@mui/icons-material/School';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { toast } from 'react-hot-toast';
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../../context/ThemeContext';
import ErrorAlert from '../common/ErrorAlert';

// ─── Styled ────────────────────────────────────────────────────────
const PageWrapper = styled(Box)`
  min-height: 100vh;
  background: var(--color-login-page-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  transition: background 0.2s ease;
`;

const CardWrapper = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 20,
  boxShadow: '0 24px 64px rgba(13,43,110,0.3)',
  overflow: 'hidden',
  width: 420,
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '95%',
    borderRadius: 16,
  },
}));

const CardHeader = styled(Box)`
  background: linear-gradient(135deg, #0d2b6e 0%, #1a3a8a 100%);
  padding: 28px 32px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const CardBody = styled(Box)`
  padding: 28px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PrimaryBtn = styled(Button)`
  height: 48px;
  font-size: 0.95rem;
  font-weight: 700;
  border-radius: 10px;
  transition: all 0.25s;
  &:hover { transform: translateY(-1px); }
`;

const SecondaryBtn = styled(Button)(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  color: theme.palette.text.secondary,
  height: 48,
  borderRadius: 10,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: theme.palette.mode === 'dark' ? 'rgba(37,99,235,0.12)' : '#eff6ff',
    color: theme.palette.primary.main,
  },
}));

const DividerRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  &::before, &::after { content:''; flex:1; height:1px; background: var(--color-border); }
`;

// ─── Validators ────────────────────────────────────────────────────
const validate = (fields, isSignup) => {
  const errs = {};
  if (!fields.user_type)               errs.user_type = 'Please select a role.';
  if (!fields.username?.trim())        errs.username  = 'Username is required.';
  else if (fields.username.trim().length < 3) errs.username = 'Username must be at least 3 characters.';
  else if (/\s/.test(fields.username.trim())) errs.username = 'Username must not contain spaces.';
  if (!fields.password)                errs.password  = 'Password is required.';
  else if (fields.password.length < 6) errs.password  = 'Password must be at least 6 characters.';
  if (isSignup && !fields.name?.trim()) errs.name     = 'Full name is required.';
  return errs;
};

// ─── Initial state ─────────────────────────────────────────────────
const signupInit = { user_type: '', name: '', username: '', password: '' };
const loginInit  = { user_type: '', username: '', password: '' };

// ─── Component ─────────────────────────────────────────────────────
const Login = ({ isUserAuthenticated }) => {
  const muiTheme = useMuiTheme();
  const { isDark, toggleTheme } = useThemeMode();

  const [tab, setTab] = useState('login');       // 'login' | 'signup'
  const [signup, setSignup] = useState(signupInit);
  const [login,  setLogin]  = useState(loginInit);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Field-level validation errors
  const [loginErrs,  setLoginErrs]  = useState({});
  const [signupErrs, setSignupErrs] = useState({});

  // Inline top-of-form alert
  const [inlineError, setInlineError] = useState('');

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const isLogin = tab === 'login';

  // ── Field change handlers (clears inline error) ──────────────────
  const onLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setLoginErrs(prev => ({ ...prev, [e.target.name]: '' }));
    setInlineError('');
  };
  const onSignupChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    setSignupErrs(prev => ({ ...prev, [e.target.name]: '' }));
    setInlineError('');
  };

  // ── Login submit ─────────────────────────────────────────────────
  const loginUser = async () => {
    const errs = validate(login, false);
    if (Object.keys(errs).length) { setLoginErrs(errs); return; }

    const payload = {
      user_type: login.user_type,
      username:  login.username.trim().toLowerCase(),
      password:  login.password,
    };

    setLoading(true);
    setInlineError('');
    try {
      const response = await API.userLogin(payload);
      if (response.isSuccess) {
        setLogin(loginInit);
        sessionStorage.setItem('accessToken',  `Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
        setAccount({
          user_type: response.data.user_type,
          username:  response.data.username,
          name:      response.data.name,
        });
        isUserAuthenticated(true);
        toast.success('Login successful! Welcome back 👋');
        navigate('/');
      } else {
        const msg = 'Incorrect username or password.';
        setInlineError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err?.serverMsg || err?.msg?.message || 'Login failed. Please try again.';
      setInlineError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Signup submit ────────────────────────────────────────────────
  const signupUser = async () => {
    const errs = validate(signup, true);
    if (Object.keys(errs).length) { setSignupErrs(errs); return; }

    const payload = {
      user_type: signup.user_type,
      name:      signup.name.trim(),
      username:  signup.username.trim().toLowerCase(),
      password:  signup.password,
    };

    setLoading(true);
    setInlineError('');
    try {
      const response = await API.userSignup(payload);
      if (response.isSuccess) {
        setSignup(signupInit);
        toast.success('Account created! Please log in.');
        setTab('login');
      } else {
        const msg = 'Registration failed. Please try again.';
        setInlineError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err?.serverMsg || err?.msg?.message || 'Registration failed. Please try again.';
      setInlineError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ── Submit on Enter ──────────────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loading) isLogin ? loginUser() : signupUser();
  };

  // ── Shared field props ───────────────────────────────────────────
  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      bgcolor: muiTheme.palette.mode === 'dark' ? '#1a2436' : '#fff',
    },
  };

  return (
    <PageWrapper>
      <CardWrapper>
        {/* ── Card Header ─────────────────────────────────────── */}
        <CardHeader>
          {/* Theme toggle inside header (visible on login page too) */}
          <IconButton
            onClick={toggleTheme}
            size="small"
            aria-label="Toggle theme"
            sx={{
              position: 'absolute', top: 12, right: 12,
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 1.5,
              p: '4px',
              '&:hover': { color: '#fbbf24', borderColor: '#fbbf24' },
            }}
          >
            {isDark ? <LightModeIcon sx={{ fontSize: 17 }} /> : <DarkModeIcon sx={{ fontSize: 17 }} />}
          </IconButton>

          <Box sx={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SchoolIcon sx={{ color: '#fbbf24', fontSize: 30 }} />
          </Box>
          <Typography sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: '1.15rem', color: '#fff', textAlign: 'center', lineHeight: 1.2 }}>
            LTCE Blog Portal
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </Typography>
        </CardHeader>

        {/* ── Card Body ───────────────────────────────────────── */}
        <CardBody onKeyDown={handleKeyDown}>
          {/* Inline error alert */}
          <ErrorAlert
            message={inlineError}
            severity="error"
            onClose={() => setInlineError('')}
          />

          {/* Role selector */}
          <TextField
            select
            label="I am a..."
            name="user_type"
            value={isLogin ? login.user_type : signup.user_type}
            onChange={isLogin ? onLoginChange : onSignupChange}
            fullWidth
            error={Boolean(isLogin ? loginErrs.user_type : signupErrs.user_type)}
            helperText={isLogin ? loginErrs.user_type : signupErrs.user_type}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SupervisorAccountIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
          </TextField>

          {/* Full Name — signup only */}
          {!isLogin && (
            <TextField
              label="Full Name"
              name="name"
              value={signup.name}
              onChange={onSignupChange}
              fullWidth
              error={Boolean(signupErrs.name)}
              helperText={signupErrs.name}
              sx={fieldSx}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
            />
          )}

          {/* Username */}
          <TextField
            label="Username"
            name="username"
            value={isLogin ? login.username : signup.username}
            onChange={isLogin ? onLoginChange : onSignupChange}
            fullWidth
            error={Boolean(isLogin ? loginErrs.username : signupErrs.username)}
            helperText={isLogin ? loginErrs.username : signupErrs.username}
            sx={fieldSx}
            inputProps={{ autoCapitalize: 'none', autoComplete: 'username' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* Password */}
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={isLogin ? login.password : signup.password}
            onChange={isLogin ? onLoginChange : onSignupChange}
            fullWidth
            error={Boolean(isLogin ? loginErrs.password : signupErrs.password)}
            helperText={isLogin ? loginErrs.password : signupErrs.password}
            sx={fieldSx}
            inputProps={{ autoComplete: isLogin ? 'current-password' : 'new-password' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(p => !p)}
                    edge="end"
                    size="small"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword
                      ? <VisibilityOffIcon sx={{ fontSize: 19, color: 'text.disabled' }} />
                      : <VisibilityIcon   sx={{ fontSize: 19, color: 'text.disabled' }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Primary action */}
          {isLogin ? (
            <PrimaryBtn
              fullWidth
              variant="contained"
              onClick={loginUser}
              disabled={loading}
              sx={{ background: 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)' }}
            >
              {loading
                ? <><CircularProgress size={18} sx={{ color: '#fff', mr: 1 }} /> Logging in...</>
                : 'Login'}
            </PrimaryBtn>
          ) : (
            <PrimaryBtn
              fullWidth
              variant="contained"
              onClick={signupUser}
              disabled={loading}
              sx={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)' }}
            >
              {loading
                ? <><CircularProgress size={18} sx={{ color: '#fff', mr: 1 }} /> Creating account...</>
                : 'Create Account'}
            </PrimaryBtn>
          )}

          {/* OR divider */}
          <DividerRow>
            <Typography sx={{ fontSize: '0.78rem', color: 'text.disabled', fontWeight: 600 }}>OR</Typography>
          </DividerRow>

          {/* Switch mode */}
          {isLogin ? (
            <SecondaryBtn fullWidth onClick={() => { setInlineError(''); setLoginErrs({}); setTab('signup'); }}>
              Create a New Account
            </SecondaryBtn>
          ) : (
            <SecondaryBtn fullWidth onClick={() => { setInlineError(''); setSignupErrs({}); setTab('login'); }}>
              Already have an account? Login
            </SecondaryBtn>
          )}
        </CardBody>
      </CardWrapper>
    </PageWrapper>
  );
};

export default Login;
