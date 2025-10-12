import { useEffect, useState } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
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
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', width: '100%' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ color: '#d32f2f', margin: '30px auto', fontSize: 18, textAlign: 'center', width: '100%' }}>
                {error}
            </Box>
        );
    }

    if (!posts || posts.length === 0) {
        return (
            <Box sx={{ 
                color: '#878787', 
                margin: '30px auto', 
                fontSize: { lg: 18, md: 16, sm: 14, xs: 12 },
                textAlign: 'center',
                padding: '0 15px',
                width: '100%'
            }}>
                <Typography>No posts available for selected category</Typography>
            </Box>
        );
    }

    return (
        <>
            {posts.map(post => (
                <Grid item lg={3} md={6} sm={6} xs={12} key={post._id}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                        <Single post={post} />
                    </Link>
                </Grid>
            ))}
        </>
    )
}

export default Posts
