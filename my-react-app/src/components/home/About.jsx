import React from 'react';
import {
  Box, Container, Typography, Grid, Card, CardContent,
  Paper, Avatar, List, ListItem, ListItemIcon, ListItemText,
  useTheme,
} from '@mui/material';
import {
  Notifications, Chat, People, MenuBook, TrendingUp,
  EmojiEvents, Campaign, Description, Event, Update as UpdateIcon,
  SchoolRounded,
} from '@mui/icons-material';

const postTypes = [
  { icon: <Campaign sx={{ fontSize: 36 }} />, label: 'Announcements', desc: 'Important college-wide updates and news', bg: 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)' },
  { icon: <Description sx={{ fontSize: 36 }} />, label: 'Notices', desc: 'Official notifications and circulars', bg: 'linear-gradient(135deg, #9d174d 0%, #db2777 100%)' },
  { icon: <Event sx={{ fontSize: 36 }} />, label: 'Schedules', desc: 'Exam dates, event timings, and deadlines', bg: 'linear-gradient(135deg, #065f46 0%, #059669 100%)' },
  { icon: <UpdateIcon sx={{ fontSize: 36 }} />, label: 'Updates', desc: 'Academic and administrative information', bg: 'linear-gradient(135deg, #92400e 0%, #d97706 100%)' },
];

const features = [
  { icon: <Notifications sx={{ fontSize: 28, color: '#2563eb' }} />, bg: '#dbeafe', darkBg: 'rgba(37,99,235,0.15)', title: 'Official Announcements', desc: 'Get timely updates on exams, events, holidays, and other important college matters directly from faculty.' },
  { icon: <People sx={{ fontSize: 28, color: '#9d174d' }} />, bg: '#fce7f3', darkBg: 'rgba(157,23,77,0.15)', title: 'Interactive Communication', desc: 'Students can comment on posts to seek clarifications or share their thoughts with teachers and peers.' },
  { icon: <MenuBook sx={{ fontSize: 28, color: '#065f46' }} />, bg: '#d1fae5', darkBg: 'rgba(6,95,70,0.15)', title: 'Centralized Information', desc: 'All notices and announcements in one place, making it easy to stay informed about college activities.' },
];

const About = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.2s ease' }}>
      {/* Hero */}
      <Box sx={{ background: isDark ? 'linear-gradient(135deg, #050e1f 0%, #0a1830 60%, #0f2050 100%)' : 'linear-gradient(135deg, #0d2b6e 0%, #1a3a8a 60%, #2563eb 100%)', color: 'white', py: { xs: 7, md: 10 }, px: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SchoolRounded sx={{ fontSize: 40, color: '#fbbf24' }} />
            <Typography variant="h2" component="h1" fontWeight={800} sx={{ fontFamily: "'Poppins',sans-serif", fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
              About LTCE Blog
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 700, fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
            Official communication platform of Lokmanya Tilak College of Engineering
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        {/* Introduction */}
        <Box sx={{ mb: 7 }}>
          <Typography variant="h4" fontWeight={800} gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary' }}>
            Welcome to LTCE Blog Platform
          </Typography>
          <Typography variant="body1" paragraph sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 820 }}>
            LTCE Blog is the official digital notice board and announcement platform for Lokmanya Tilak College of Engineering. This platform bridges the communication gap between faculty and students, ensuring that important information reaches everyone quickly and efficiently.
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 820 }}>
            Teachers and faculty members can post announcements, notices, updates, and important information, while students stay informed and engaged through reading and commenting on these posts.
          </Typography>
        </Box>

        {/* How it works */}
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 7, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
          <Typography variant="h4" fontWeight={800} align="center" gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary' }}>
            How It Works
          </Typography>
          <Grid container spacing={5} sx={{ mt: 1 }}>
            {[
              { title: 'For Teachers', avatarBg: '#dbeafe', icon: <Notifications sx={{ fontSize: 36, color: '#2563eb' }} />, numBg: '#1a3a8a', items: ['Create and publish announcements and notices', 'Share important updates and information', 'Post academic schedules and deadlines', 'Monitor student engagement and feedback'] },
              { title: 'For Students', avatarBg: '#d1fae5', icon: <Chat sx={{ fontSize: 36, color: '#059669' }} />, numBg: '#059669', items: ['Read all announcements and notices', 'Stay updated with college activities', 'Comment and ask questions on posts', 'Engage in meaningful discussions'] },
            ].map((col, ci) => (
              <Grid item xs={12} md={6} key={ci}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ width: 72, height: 72, bgcolor: isDark ? 'rgba(255,255,255,0.08)' : col.avatarBg, margin: '0 auto', mb: 2 }}>
                    {col.icon}
                  </Avatar>
                  <Typography variant="h5" fontWeight={700} gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary' }}>{col.title}</Typography>
                  <List dense>
                    {col.items.map((text, i) => (
                      <ListItem key={i} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: col.numBg, fontSize: 12 }}>{i + 1}</Avatar>
                        </ListItemIcon>
                        <ListItemText primary={text} primaryTypographyProps={{ sx: { fontSize: '0.9rem', color: 'text.secondary' } }} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* Feature cards */}
        <Grid container spacing={3} sx={{ mb: 7 }}>
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i} sx={{ display: 'flex' }}>
              <Card elevation={0} sx={{ border: `1px solid ${theme.palette.divider}`, borderRadius: 3, display: 'flex', flexDirection: 'column', flex: 1, bgcolor: 'background.paper', transition: 'all 0.25s', '&:hover': { boxShadow: '0 10px 28px rgba(37,99,235,0.14)', transform: 'translateY(-3px)', borderColor: theme.palette.primary.main } }}>
                <CardContent sx={{ p: 3 }}>
                  <Avatar sx={{ width: 52, height: 52, bgcolor: isDark ? f.darkBg : f.bg, mb: 2, borderRadius: 2 }}>{f.icon}</Avatar>
                  <Typography variant="h6" fontWeight={700} gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary' }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{f.desc}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Mission & Vision */}
        <Grid container spacing={3} sx={{ mb: 7 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, background: isDark ? 'rgba(37,99,235,0.1)' : 'linear-gradient(135deg,#dbeafe 0%,#bfdbfe 100%)', border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#bfdbfe'}`, borderRadius: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <TrendingUp sx={{ fontSize: 36, color: isDark ? '#3b82f6' : '#1a3a8a' }} />
                <Typography variant="h5" fontWeight={700} sx={{ fontFamily: "'Poppins',sans-serif", color: isDark ? '#3b82f6' : '#1a3a8a' }}>Our Mission</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                To provide a seamless and efficient communication channel between faculty and students, ensuring that important information reaches everyone promptly and fostering a transparent academic environment.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 4, background: isDark ? 'rgba(217,119,6,0.1)' : 'linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)', border: `1px solid ${isDark ? 'rgba(245,158,11,0.25)' : '#fde68a'}`, borderRadius: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <EmojiEvents sx={{ fontSize: 36, color: '#d97706' }} />
                <Typography variant="h5" fontWeight={700} sx={{ fontFamily: "'Poppins',sans-serif", color: isDark ? '#f59e0b' : '#92400e' }}>Our Vision</Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                To become the primary digital platform for official college communications, creating an engaged and well-informed student community at Lokmanya Tilak College of Engineering.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* What you'll find */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" fontWeight={800} align="center" gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary', mb: 3 }}>
            What You'll Find Here
          </Typography>
          <Grid container spacing={3}>
            {postTypes.map((p, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper elevation={0} sx={{ p: 3, background: p.bg, color: 'white', borderRadius: 3, transition: 'all 0.25s', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 10px 28px rgba(0,0,0,0.18)' } }}>
                  {p.icon}
                  <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "'Poppins',sans-serif", mt: 1, mb: 0.5 }}>{p.label}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.88, lineHeight: 1.6 }}>{p.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ background: isDark ? '#080f1e' : '#0d2b6e', py: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          © 2025 Lokmanya Tilak College of Engineering — LTCE Blog Team
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
