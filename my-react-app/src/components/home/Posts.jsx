import { useEffect, useState } from 'react';
import { Grid, Box, Typography, Skeleton, styled } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../../service/api';
import Single from './Single';

// ─── Skeleton Card ─────────────────────────────────────────────────
const SkeletonCard = () => (
  <Box
    sx={{
      borderRadius: '14px',
      overflow: 'hidden',
      background: (theme) => (theme.palette.mode === 'dark' ? '#1e2a3e' : '#fff'),
      border: (theme) => `1px solid ${theme.palette.divider}`,
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      height: '100%',
    }}
  >
    <Skeleton variant="rectangular" width="100%" height={175} animation="wave" />
    <Box sx={{ p: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Skeleton variant="rounded" width={70} height={20} animation="wave" />
      <Skeleton variant="text" width="90%" sx={{ fontSize: '1rem' }} animation="wave" />
      <Skeleton variant="text" width="70%" sx={{ fontSize: '1rem' }} animation="wave" />
      <Skeleton variant="text" width="100%" animation="wave" />
      <Skeleton variant="text" width="80%" animation="wave" />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1, mt: 0.5 }}>
        <Skeleton variant="text" width={80} animation="wave" />
        <Skeleton variant="text" width={80} animation="wave" />
      </Box>
    </Box>
  </Box>
);

// ─── Empty State ─────────────────────────────────────────────────
const EmptyWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  width: 100%;
  gap: 16px;
  text-align: center;
  padding: 40px 20px;
`;

// ─── Component ───────────────────────────────────────────────────
const Posts = () => {
  const [posts, getPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        let response = await API.getAllPost({ category: category || '' });

        if (response.isSuccess) {
          getPosts(response.data || []);
        } else {
          setError('Failed to fetch posts');
          getPosts([]);
        }
      } catch (err) {
        setError('Error fetching posts');
        console.error(err);
        getPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  // ─── Skeleton Loading ────────────────────────────────────────────
  if (loading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, i) => (
          <Grid item lg={3} sm={6} xs={12} key={i}>
            <SkeletonCard />
          </Grid>
        ))}
      </>
    );
  }

  // ─── Error State ─────────────────────────────────────────────────
  if (error) {
    return (
      <Grid item xs={12}>
        <EmptyWrapper>
          <InboxIcon sx={{ fontSize: 64, color: '#d1d5db' }} />
          <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 600 }}>
            Something went wrong
          </Typography>
          <Typography sx={{ color: '#9ca3af', fontSize: '0.9rem' }}>{error}</Typography>
        </EmptyWrapper>
      </Grid>
    );
  }

  // ─── Empty State ─────────────────────────────────────────────────
  if (!posts || posts.length === 0) {
    return (
      <Grid item xs={12}>
        <EmptyWrapper>
          <Box
            sx={{
              width: 90,
              height: 90,
              borderRadius: '50%',
              background: (theme) =>
                theme.palette.mode === 'dark' ? 'rgba(37,99,235,0.15)' : '#eff6ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InboxIcon sx={{ fontSize: 48, color: '#93c5fd' }} />
          </Box>
          <Typography
            variant="h6"
            sx={{ color: 'text.primary', fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
          >
            No posts found
          </Typography>
          <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem', maxWidth: 300 }}>
            {category
              ? `No posts available in the "${category}" category right now.`
              : 'No posts are currently available.'}
          </Typography>
        </EmptyWrapper>
      </Grid>
    );
  }

  // ─── Posts Grid ───────────────────────────────────────────────────
  return (
    <>
      {posts.map((post, i) => (
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
          key={post._id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            animation: `fadeUp 0.4s ease ${i * 0.04}s both`,
            '@keyframes fadeUp': {
              from: { opacity: 0, transform: 'translateY(16px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Link
            style={{
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '100%',
            }}
            to={`details/${post._id}`}
          >
            <Single post={post} />
          </Link>
        </Grid>
      ))}
    </>
  );
};

export default Posts;