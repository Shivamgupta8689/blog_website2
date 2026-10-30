import React, { useState } from 'react';
import {
  Box, Container, Typography, Grid, TextField, Button,
  Paper, Avatar, Card, List, ListItem, ListItemIcon,
  ListItemText, Alert, CircularProgress, useTheme,
} from '@mui/material';
import {
  Email, Phone, LocationOn, Send, SupportAgent,
  AccessTime, ContactMail, SchoolRounded,
  PersonOutline, MessageOutlined,
} from '@mui/icons-material';

const formInitial = { name: '', email: '', subject: '', message: '' };

const Contact = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [form, setForm] = useState(formInitial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); setForm(formInitial); }, 1200);
  };

  const contactInfoItems = [
    { icon: <Email />, bg: '#1a3a8a', primary: 'Email', secondary: 'ltceblog@ltce.edu.in' },
    { icon: <Phone />, bg: '#059669', primary: 'Phone', secondary: '+91 22 2754 1234' },
    { icon: <LocationOn />, bg: '#d97706', primary: 'Address', secondary: 'Vikas Nagar, Kopar Khairane, Navi Mumbai, Maharashtra 400709' },
    { icon: <AccessTime />, bg: '#7c3aed', primary: 'Office Hours', secondary: 'Mon – Sat: 9:00 AM – 5:00 PM' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', transition: 'background-color 0.2s ease' }}>
      {/* Hero */}
      <Box sx={{ background: isDark ? 'linear-gradient(135deg, #050e1f 0%, #0a1830 60%, #0f2050 100%)' : 'linear-gradient(135deg, #0d2b6e 0%, #1a3a8a 60%, #2563eb 100%)', color: 'white', py: { xs: 7, md: 10 }, px: 2 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <SchoolRounded sx={{ fontSize: 40, color: '#fbbf24' }} />
            <Typography variant="h2" component="h1" fontWeight={800} sx={{ fontFamily: "'Poppins',sans-serif", fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' } }}>
              Contact Us
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ opacity: 0.8, maxWidth: 600, fontWeight: 400, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
            Get in touch with the LTCE Blog Team — we'd love to hear from you!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Grid container spacing={5}>
          {/* Info card */}
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper', height: '100%' }}>
              <Typography variant="h5" fontWeight={800} gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary' }}>
                Reach Us At
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.7 }}>
                Whether you have a question, suggestion, or feedback — feel free to reach out. Our team is here to assist you.
              </Typography>

              <List disablePadding>
                {contactInfoItems.map((item, i) => (
                  <ListItem key={i} disableGutters sx={{ py: 1 }}>
                    <ListItemIcon sx={{ minWidth: 48 }}>
                      <Avatar sx={{ bgcolor: item.bg, width: 38, height: 38 }}>{item.icon}</Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={item.primary}
                      secondary={item.secondary}
                      primaryTypographyProps={{ sx: { fontWeight: 600, fontSize: '0.9rem', color: 'text.primary' } }}
                      secondaryTypographyProps={{ sx: { fontSize: '0.82rem', color: 'text.secondary' } }}
                    />
                  </ListItem>
                ))}
              </List>

              <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ color: 'text.primary' }}>
                  Support Channels
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <Card elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: isDark ? 'rgba(37,99,235,0.1)' : '#eff6ff', border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#bfdbfe'}`, borderRadius: 2 }}>
                      <SupportAgent sx={{ color: '#2563eb', fontSize: 28 }} />
                      <Typography variant="caption" fontWeight={700} display="block" sx={{ color: isDark ? '#3b82f6' : '#1e40af', mt: 0.5 }}>Technical Help</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: isDark ? 'rgba(217,119,6,0.1)' : '#fef3c7', border: `1px solid ${isDark ? 'rgba(245,158,11,0.25)' : '#fde68a'}`, borderRadius: 2 }}>
                      <ContactMail sx={{ color: '#d97706', fontSize: 28 }} />
                      <Typography variant="caption" fontWeight={700} display="block" sx={{ color: isDark ? '#f59e0b' : '#92400e', mt: 0.5 }}>General Queries</Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact form */}
          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, border: `1px solid ${theme.palette.divider}`, bgcolor: 'background.paper' }}>
              <Typography variant="h5" fontWeight={800} gutterBottom sx={{ fontFamily: "'Poppins',sans-serif", color: 'text.primary' }}>
                Send a Message
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Fill out the form below and our team will get back to you.
              </Typography>

              {submitted && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  ✅ Your message has been sent! We'll get back to you shortly.
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Your Name" name="name" value={form.name} onChange={handleChange} fullWidth required
                      InputProps={{ startAdornment: <PersonOutline sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} /> }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required
                      InputProps={{ startAdornment: <Email sx={{ color: 'text.disabled', mr: 1, fontSize: 20 }} /> }} />
                  </Grid>
                </Grid>

                <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} fullWidth />

                <TextField
                  label="Message" name="message" value={form.message} onChange={handleChange}
                  multiline minRows={5} fullWidth required
                  InputProps={{ startAdornment: <MessageOutlined sx={{ color: 'text.disabled', mr: 1, fontSize: 20, alignSelf: 'flex-start', mt: 1.5 }} /> }}
                />

                <Button type="submit" variant="contained" endIcon={loading ? null : <Send />}
                  disabled={loading || !form.name || !form.email || !form.message}
                  sx={{ background: 'linear-gradient(135deg, #1a3a8a 0%, #2563eb 100%)', height: 48, fontWeight: 700, fontSize: '0.95rem', borderRadius: 2, alignSelf: 'flex-end', px: 4 }}>
                  {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Send Message'}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ background: isDark ? '#080f1e' : '#0d2b6e', py: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
          © {new Date().getFullYear()} Lokmanya Tilak College of Engineering — LTCE Blog Team
        </Typography>
      </Box>
    </Box>
  );
};

export default Contact;
