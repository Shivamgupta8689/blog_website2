import { useState, useEffect, useContext } from 'react';
import { Box, Typography, Chip, Avatar, Button, useTheme, Divider, IconButton, Tooltip, styled } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import Comments from './comments/Comments';

const badgeStyle = {
  Notice:       { color: '#1e40af', bg: '#dbeafe' },
  Announcement: { color: '#9d174d', bg: '#fce7f3' },
  Schedules:    { color: '#065f46', bg: '#d1fae5' },
  Alumini:      { color: '#92400e', bg: '#fef3c7' },
  Events:       { color: '#5b21b6', bg: '#ede9fe' },
};

const PageWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 860, margin: '32px auto 64px', padding: '0 16px',
  [theme.breakpoints.down('md')]: { margin: '16px auto 48px' },
}));

const HeroImage = styled('img')`
  width: 100%; height: 420px; object-fit: cover; border-radius: 16px; display: block;
  @media (max-width: 600px) { height: 240px; border-radius: 12px; }
`;

const PostTitle = styled(Typography)(({ theme }) => ({
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 800,
  color: theme.palette.text.primary,
  lineHeight: 1.25,
  marginBottom: 16,
}));

const PostBody = styled(Typography)(({ theme }) => ({
  fontSize: '1.05rem',
  lineHeight: 1.85,
  color: theme.palette.text.secondary,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}));

const DetailView = () => {
  const theme = useTheme();
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const url = post.picture
    ? post.picture
    : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixlib=rb-1.2.1&w=1000&q=80';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.getPostById(id);
        if (response?.isSuccess) setPost(response.data);
      } catch (error) { console.error('Error fetching post:', error); }
    };
    fetchData();
  }, [id]);

  const deleteBlog = async () => {
    try {
      let response = await API.deletePost(post._id);
      if (response.isSuccess) navigate('/');
    } catch (error) { console.error('Error deleting post:', error); }
  };

  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return ''; }
  };

  const badge = badgeStyle[post.categories] || { color: theme.palette.text.secondary, bg: theme.palette.action.hover };
  const isOwner = account?.username === post?.username;
  const iconBtnBase = { border: `1px solid ${theme.palette.divider}`, borderRadius: 2 };

  return (
    <PageWrapper>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />}
        sx={{ color: 'text.secondary', mb: 2, fontWeight: 500, fontSize: '0.85rem', '&:hover': { color: 'primary.main' } }}>
        Back to Posts
      </Button>

      <HeroImage src={url} alt={post.title || 'post'} />

      {/* Action bar */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2.5, mb: 1, flexWrap: 'wrap', gap: 1 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {post.categories && (
            <Chip label={post.categories} size="small"
              sx={{ bgcolor: badge.bg, color: badge.color, fontWeight: 700, fontSize: '0.78rem' }} />
          )}
        </Box>
        {isOwner && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Tooltip title="Edit post">
              <IconButton component={Link} to={`/update/${post._id}`} size="small"
                sx={{ ...iconBtnBase, color: 'primary.main', '&:hover': { bgcolor: 'primary.50', borderColor: 'primary.200' } }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete post">
              <IconButton size="small" onClick={deleteBlog}
                sx={{ ...iconBtnBase, color: 'error.main', '&:hover': { bgcolor: '#fef2f2', borderColor: '#fca5a5' } }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Box>

      <PostTitle variant="h3" sx={{ fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' } }}>
        {post.title}
      </PostTitle>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', color: 'text.secondary', fontSize: '0.875rem', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: '#dbeafe', color: '#1e40af', fontSize: 14 }}>
            <PersonIcon sx={{ fontSize: 16 }} />
          </Avatar>
          <Typography sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.875rem' }}>{post.username}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography sx={{ fontSize: '0.875rem' }}>{formatDate(post.createdDate)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />
      <PostBody>{post.description}</PostBody>
      <Comments post={post} />
    </PageWrapper>
  );
};

export default DetailView;
