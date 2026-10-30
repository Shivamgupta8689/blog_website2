import { useContext } from 'react';
import { Typography, Box, Avatar, IconButton, Tooltip, styled, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../../../service/api';
import { DataContext } from '../../../context/DataProvider';

const CommentCard = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? theme.palette.action.hover : '#f9fafb',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 12,
  padding: '14px 16px',
  transition: 'background 0.2s',
  '&:hover': {
    background: theme.palette.mode === 'dark'
      ? 'rgba(255,255,255,0.06)'
      : '#f3f4f6',
  },
}));

const Comment = ({ comment, setToggle }) => {
  const theme = useTheme();
  const { account } = useContext(DataContext);
  const isOwner = comment.name === account.username;

  const removeComment = async () => {
    try {
      await API.deleteComments(comment._id);
      setToggle(prev => !prev);
    } catch (error) { console.error('Failed to delete comment', error); }
  };

  const initials = comment.name ? comment.name.slice(0, 2).toUpperCase() : '?';
  const formatDate = (d) => {
    try {
      return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return ''; }
  };

  const colors = ['#1a3a8a', '#065f46', '#9d174d', '#92400e', '#5b21b6'];
  const colorIndex = comment.name ? comment.name.charCodeAt(0) % colors.length : 0;

  return (
    <CommentCard>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 1 }}>
        <Avatar sx={{ width: 34, height: 34, bgcolor: colors[colorIndex], fontSize: '0.78rem', fontWeight: 700 }}>
          {initials}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: 'text.primary', lineHeight: 1.2 }}>
            {comment.name}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: 'text.disabled' }}>
            {formatDate(comment.date)}
          </Typography>
        </Box>
        {isOwner && (
          <Tooltip title="Delete comment">
            <IconButton size="small" onClick={removeComment}
              sx={{ color: 'text.disabled', '&:hover': { color: 'error.main', bgcolor: '#fef2f2' } }}>
              <DeleteIcon sx={{ fontSize: 17 }} />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Typography sx={{ fontSize: '0.88rem', color: 'text.secondary', lineHeight: 1.65, pl: '46px' }}>
        {comment.comments}
      </Typography>
    </CommentCard>
  );
};

export default Comment;
