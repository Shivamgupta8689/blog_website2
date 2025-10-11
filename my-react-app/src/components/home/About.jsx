import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Notifications,
  Chat,
  People,
  MenuBook,
  TrendingUp,
  EmojiEvents,
  Campaign,
  Description,
  Event,
  Update,
} from '@mui/icons-material';

const About = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)',
          color: 'white',
          py: 10,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            About LTCE Blog
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '800px' }}>
            Official communication platform of Lokmanya Tilak College of Engineering
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {/* Introduction */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="text.primary">
            Welcome to LTCE Blog Platform
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary" fontSize="1.1rem">
            LTCE Blog is the official digital notice board and announcement platform for
            Lokmanya Tilak College of Engineering. This platform bridges the communication
            gap between faculty and students, ensuring that important information reaches
            everyone quickly and efficiently.
          </Typography>
          <Typography variant="body1" color="text.secondary" fontSize="1.1rem">
            Teachers and faculty members can post announcements, notices, updates, and important
            information, while students stay informed and engaged through reading and commenting
            on these posts.
          </Typography>
        </Box>

        {/* How It Works */}
        <Paper elevation={3} sx={{ p: 4, mb: 8, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            How It Works
          </Typography>
          <Grid container spacing={6} sx={{ mt: 2 }}>
            {/* For Teachers */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: '#e3f2fd',
                    margin: '0 auto',
                    mb: 2,
                  }}
                >
                  <Notifications sx={{ fontSize: 40, color: '#1976d2' }} />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  For Teachers
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#1976d2', fontSize: 14 }}>
                        1
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Create and publish announcements and notices" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#1976d2', fontSize: 14 }}>
                        2
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Share important updates and information" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#1976d2', fontSize: 14 }}>
                        3
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Post academic schedules and deadlines" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#1976d2', fontSize: 14 }}>
                        4
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Monitor student engagement and feedback" />
                  </ListItem>
                </List>
              </Box>
            </Grid>

            {/* For Students */}
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: '#f3e5f5',
                    margin: '0 auto',
                    mb: 2,
                  }}
                >
                  <Chat sx={{ fontSize: 40, color: '#9c27b0' }} />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  For Students
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#9c27b0', fontSize: 14 }}>
                        1
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Read all announcements and notices" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#9c27b0', fontSize: 14 }}>
                        2
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Stay updated with college activities" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#9c27b0', fontSize: 14 }}>
                        3
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Comment and ask questions on posts" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: '#9c27b0', fontSize: 14 }}>
                        4
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary="Engage in meaningful discussions" />
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Features */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, transition: 'all 0.3s' }}>
              <CardContent>
                <Avatar sx={{ width: 60, height: 60, bgcolor: '#e3f2fd', mb: 2 }}>
                  <Notifications sx={{ fontSize: 30, color: '#1976d2' }} />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Official Announcements
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get timely updates on exams, events, holidays, and other important college
                  matters directly from faculty.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, transition: 'all 0.3s' }}>
              <CardContent>
                <Avatar sx={{ width: 60, height: 60, bgcolor: '#f3e5f5', mb: 2 }}>
                  <People sx={{ fontSize: 30, color: '#9c27b0' }} />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Interactive Communication
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Students can comment on posts to seek clarifications or share their thoughts
                  with teachers and peers.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', '&:hover': { boxShadow: 6 }, transition: 'all 0.3s' }}>
              <CardContent>
                <Avatar sx={{ width: 60, height: 60, bgcolor: '#e8f5e9', mb: 2 }}>
                  <MenuBook sx={{ fontSize: 30, color: '#4caf50' }} />
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Centralized Information
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All notices and announcements in one place, making it easy to stay informed
                  about college activities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Mission & Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUp sx={{ fontSize: 40, color: '#1976d2', mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Our Mission
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                To provide a seamless and efficient communication channel between faculty and
                students, ensuring that important information reaches everyone promptly and
                fostering a transparent academic environment.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
                borderRadius: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmojiEvents sx={{ fontSize: 40, color: '#9c27b0', mr: 2 }} />
                <Typography variant="h5" fontWeight="bold">
                  Our Vision
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                To become the primary digital platform for official college communications,
                creating an engaged and well-informed student community at Lokmanya Tilak College
                of Engineering.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Types of Posts */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
            What You'll Find Here
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  color: 'white',
                  borderRadius: 3,
                }}
              >
                <Campaign sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Announcements
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Important college-wide updates and news
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #9c27b0 0%, #7b1fa2 100%)',
                  color: 'white',
                  borderRadius: 3,
                }}
              >
                <Description sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Notices
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Official notifications and circulars
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #4caf50 0%, #388e3c 100%)',
                  color: 'white',
                  borderRadius: 3,
                }}
              >
                <Event sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Schedules
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Exam dates, event timings, and deadlines
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
                  color: 'white',
                  borderRadius: 3,
                }}
              >
                <Update sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Updates
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Academic and administrative information
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        
      </Container>

      {/* Footer Note */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
        © 2025 Lokmanya Tilak College of Engineering — LTCE Blog Team
        </Typography>
      </Box>
    </Box>
  );
};

export default About;
