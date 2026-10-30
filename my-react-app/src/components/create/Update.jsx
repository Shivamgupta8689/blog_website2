import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Button, TextField, Typography, MenuItem,
  Select, FormControl, InputLabel, Paper,
  styled, Divider, TextareaAutosize, useTheme,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SaveIcon from '@mui/icons-material/Save';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DataContext } from '../../context/DataProvider';
import API from '../../service/api';
import { categories } from '../../constants/data';

// ─── Styled (same tokens as CreatePost) ───────────────────────────
const PageWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 860, margin: '32px auto', padding: '0 16px 60px',
  [theme.breakpoints.down('md')]: { margin: '16px auto' },
}));

const ImageUploadBox = styled(Box)(({ theme }) => ({
  width: '100%', height: 320, borderRadius: 14, cursor: 'pointer',
  border: `2px dashed ${theme.palette.divider}`,
  background: theme.palette.action.hover,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  flexDirection: 'column', gap: 10, transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    background: theme.palette.mode === 'dark' ? 'rgba(37,99,235,0.08)' : '#eff6ff',
  },
}));

const PreviewImage = styled('img')`
  width: 100%; height: 320px; object-fit: cover; border-radius: 14px; display: block;
`;

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: '100%', fontFamily: "'Inter', sans-serif", fontSize: '1rem', lineHeight: 1.75,
  color: theme.palette.text.primary, border: `1px solid ${theme.palette.divider}`,
  borderRadius: 10, padding: '14px 16px', resize: 'vertical', outline: 'none',
  background: theme.palette.background.paper, transition: 'border-color 0.2s',
  '&:focus': { borderColor: theme.palette.primary.main, boxShadow: '0 0 0 3px rgba(37,99,235,0.12)' },
  '&::placeholder': { color: theme.palette.text.disabled },
}));

const initialPost = {
  title: '', description: '', picture: '',
  username: '', categories: '', createdDate: new Date(),
};

// ─── Component ────────────────────────────────────────────────────
const Update = () => {
  const theme = useTheme();
  const [post, setPost] = useState(initialPost);
  const location = useLocation();
  const navigate = useNavigate();
  const { account } = useContext(DataContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) setPost(response.data);
    };
    fetchData();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);
    try {
      const response = await API.uploadFile(formData);
      if (response.data?.imageUrl) setPost(prev => ({ ...prev, picture: response.data.imageUrl }));
    } catch (err) { console.error('Image upload failed:', err); }
  };

  useEffect(() => {
    setPost(prev => ({
      ...prev,
      categories: location.search?.split('=')[1] || prev.categories || 'All',
      username: account.username,
    }));
  }, [location.search, account.username]);

  const handleChange = (e) => setPost({ ...post, [e.target.name]: e.target.value });

  const updateBlogpost = async () => {
    const response = await API.updatePost(post);
    if (response.isSuccess) navigate(`/details/${id}`);
  };

  return (
    <PageWrapper>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
          Edit Post
        </Typography>
        <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>Update your post content and details</Typography>
      </Box>

      <Paper elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3, p: { xs: 2, sm: 3 }, display: 'flex', flexDirection: 'column', gap: 3, bgcolor: 'background.paper' }}>
        <Box>
          <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem', color: 'text.secondary' }}>Banner Image</Typography>
          <label htmlFor="fileInputUpdate" style={{ display: 'block' }}>
            {post.picture
              ? <PreviewImage src={post.picture} alt="Preview" />
              : (
                <ImageUploadBox>
                  <AddPhotoAlternateIcon sx={{ fontSize: 40, color: 'text.disabled' }} />
                  <Typography sx={{ color: 'text.secondary', fontSize: '0.88rem', fontWeight: 500 }}>Click to upload banner image</Typography>
                </ImageUploadBox>
              )
            }
          </label>
          <input type="file" id="fileInputUpdate" style={{ display: 'none' }} onChange={handleUpload} accept="image/*" />
          {post.picture && (
            <Button size="small" sx={{ mt: 1, color: 'text.secondary', fontSize: '0.78rem' }} onClick={() => setPost(prev => ({ ...prev, picture: '' }))}>Remove image</Button>
          )}
        </Box>

        <Divider />

        <TextField label="Post Title" name="title" value={post.title} onChange={handleChange} fullWidth />

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select name="categories" value={post.categories || ''} label="Category" onChange={handleChange}>
            <MenuItem value="All">All</MenuItem>
            {categories.map(cat => <MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>)}
          </Select>
        </FormControl>

        <Box>
          <Typography sx={{ fontWeight: 600, mb: 1, fontSize: '0.9rem', color: 'text.secondary' }}>Content</Typography>
          <StyledTextarea minRows={8} name="description" value={post.description} onChange={handleChange} placeholder="Write the post content here..." />
        </Box>

        <Divider />

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <Button variant="outlined" onClick={() => navigate(`/details/${id}`)} sx={{ color: 'text.secondary', borderColor: 'divider' }}>Cancel</Button>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={updateBlogpost}
            sx={{ background: 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)', px: 3, fontWeight: 700 }}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </PageWrapper>
  );
};

export default Update;
