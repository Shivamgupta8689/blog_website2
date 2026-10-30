import { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, Avatar, Divider, useTheme, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { DataContext } from '../../../context/DataProvider';
import API from '../../../service/api';
import Comment from './Comment';

const CommentSection = styled(Box)` margin-top: 56px; `;

const CommentInputRow = styled(Box)`
  display: flex; align-items: flex-start; gap: 12px; margin-bottom: 28px;
`;

const initialValue = { name: '', postId: '', date: new Date(), comments: '' };

const Comments = ({ post }) => {
  const theme = useTheme();
  const [comment, setComment] = useState(initialValue);
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      if (!post?._id) return;
      try {
        const response = await API.getAllComments(post._id);
        if (response.isSuccess) setComments(response.data);
      } catch (error) { console.error('Failed to fetch comments:', error); }
    };
    getData();
  }, [toggle, post]);

  const handleChange = (e) => {
    setComment({ ...comment, name: account.username, postId: post._id, comments: e.target.value });
  };

  const addComment = async () => {
    if (!comment.comments.trim()) return;
    await API.newComment(comment);
    setComment(initialValue);
    setToggle(prev => !prev);
  };

  const initials = account.username ? account.username.slice(0, 2).toUpperCase() : '?';

  return (
    <CommentSection>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <ChatBubbleOutlineIcon sx={{ color: 'primary.main', fontSize: 22 }} />
        <Typography variant="h6" sx={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, color: 'text.primary' }}>
          Comments {comments.length > 0 && `(${comments.length})`}
        </Typography>
      </Box>

      <CommentInputRow>
        <Avatar sx={{ width: 38, height: 38, bgcolor: '#1a3a8a', fontSize: '0.82rem', fontWeight: 700, flexShrink: 0, mt: 0.5 }}>
          {initials}
        </Avatar>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            multiline minRows={3} maxRows={6}
            placeholder="What's on your mind?"
            value={comment.comments}
            onChange={handleChange}
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.9rem', bgcolor: 'background.paper' } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" endIcon={<SendIcon />} onClick={addComment}
              disabled={!comment.comments.trim()}
              sx={{ background: 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)', fontWeight: 700, borderRadius: 2, px: 2.5 }}>
              Post
            </Button>
          </Box>
        </Box>
      </CommentInputRow>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {comments && comments.length > 0
          ? comments.map(c => <Comment key={c._id} comment={c} setToggle={setToggle} />)
          : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography sx={{ color: 'text.disabled', fontSize: '0.9rem' }}>
                No comments yet. Be the first to comment!
              </Typography>
            </Box>
          )
        }
      </Box>
    </CommentSection>
  );
};

export default Comments;