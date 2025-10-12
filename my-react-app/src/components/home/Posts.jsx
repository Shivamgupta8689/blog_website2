import { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress, Container, Typography } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../../service/api';
import Single from './Single';

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

    if (loading) {
        return (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Grid>
        );
    }

    if (error) {
        return (
            <Grid item xs={12}>
                <Box sx={{ color: '#d32f2f', margin: '30px auto', fontSize: 18, textAlign: 'center' }}>
                    {error}
                </Box>
            </Grid>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <Grid item xs={12}>
                <Box sx={{ 
                    color: '#878787', 
                    margin: '30px auto', 
                    fontSize: { lg: 18, md: 16, sm: 14, xs: 12 },
                    textAlign: 'center',
                    padding: '0 15px'
                }}>
                    <Typography>No posts available for selected category</Typography>
                </Box>
            </Grid>
        );
    }

    return (
        <>
            {posts.map(post => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={post._id} sx={{ padding: '8px' }}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                        <Single post={post} />
                    </Link>
                </Grid>
            ))}
        </>
    )
}

export default Posts
