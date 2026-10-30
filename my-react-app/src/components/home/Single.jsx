import { styled, Box, Typography, Chip, useTheme } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';

// ─── Category badge color map ───────────────────────────────────────
const badgeStyle = {
  Notice:       { color: '#1e40af', bg: '#dbeafe' },
  Announcement: { color: '#9d174d', bg: '#fce7f3' },
  Schedules:    { color: '#065f46', bg: '#d1fae5' },
  Alumini:      { color: '#92400e', bg: '#fef3c7' },
  Events:       { color: '#5b21b6', bg: '#ede9fe' },
};

// ─── Styled ────────────────────────────────────────────────────────
const CardWrapper = styled(Box)(({ theme }) => ({
  borderRadius: 14,
  background: theme.palette.background.paper,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 2px 10px rgba(0,0,0,0.3)'
    : '0 2px 10px rgba(0,0,0,0.07)',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  cursor: 'pointer',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 10px 28px rgba(37,99,235,0.25)'
      : '0 10px 28px rgba(37,99,235,0.16)',
    borderColor: theme.palette.mode === 'dark' ? '#3b5bdb' : '#bfdbfe',
  },
}));

const CardImage = styled('img')`
  width: 100%;
  height: 175px;
  object-fit: cover;
  display: block;
  flex-shrink: 0;
`;

const CardBody = styled(Box)`
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const TitleText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: '0.97rem',
  color: theme.palette.text.primary,
  lineHeight: 1.35,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const DescText = styled(Typography)(({ theme }) => ({
  fontSize: '0.82rem',
  color: theme.palette.text.secondary,
  lineHeight: 1.55,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

const MetaRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '0.75rem',
  color: theme.palette.text.disabled,
  marginTop: 'auto',
  paddingTop: 8,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

// ─── Component ─────────────────────────────────────────────────────
const Post = ({ post }) => {
  const theme = useTheme();
  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';

  const badge = badgeStyle[post.categories] || {
    color: theme.palette.text.secondary,
    bg: theme.palette.action.hover,
  };

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
  };

  return (
    <CardWrapper>
      <CardImage src={url} alt={post.title || 'post'} />
      <CardBody>
        {post.categories && (
          <Box>
            <Chip
              label={post.categories}
              size="small"
              sx={{
                bgcolor: badge.bg,
                color: badge.color,
                fontWeight: 700,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          </Box>
        )}
        <TitleText>{post.title}</TitleText>
        <DescText>{post.description}</DescText>
        <MetaRow>
          <PersonIcon sx={{ fontSize: 13, color: 'text.disabled' }} />
          <Typography variant="inherit" sx={{ fontWeight: 500, color: 'text.secondary' }}>
            {post.username}
          </Typography>
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 12, color: 'text.disabled' }} />
            <Typography variant="inherit">{formatDate(post.createdDate)}</Typography>
          </Box>
        </MetaRow>
      </CardBody>
    </CardWrapper>
  );
};

export default Post;