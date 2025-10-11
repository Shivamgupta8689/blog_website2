import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Avatar,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Send,
  SupportAgent,
  AccessTime,
  ContactMail,
} from "@mui/icons-material";

const Contact = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #9c27b0 100%)",
          color: "white",
          py: 10,
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: "800px" }}>
            Get in touch with the LTCE Blog Team — we’d love to hear from you!
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Contact Information */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{ p: 4, borderRadius: 3, height: "100%", bgcolor: "#ffffff" }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                color="text.primary"
              >
                Reach Us At
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Whether you have a question, suggestion, or feedback — feel free
                to reach out. Our team is here to assist you.
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#1976d2" }}>
                      <Email />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary="ltceblog@ltce.edu.in"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#9c27b0" }}>
                      <Phone />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary="+91 22 2754 1234"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#4caf50" }}>
                      <LocationOn />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary="4244+7VQ, Vikas Nagar, ज्ञान विकास मार्ग, सेक्टर 4, Kopar Khairane, Navi Mumbai, Maharashtra 400709"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "#ff9800" }}>
                      <AccessTime />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText
                    primary="Office Hours"
                    secondary="Mon - Sat: 9:00 AM - 5:00 PM"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Support Channels
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#e3f2fd",
                        borderRadius: 2,
                      }}
                    >
                      <SupportAgent sx={{ color: "#1976d2", fontSize: 35 }} />
                      <Typography variant="body2" fontWeight="bold">
                        Technical Help
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#f3e5f5",
                        borderRadius: 2,
                      }}
                    >
                      <ContactMail sx={{ color: "#9c27b0", fontSize: 35 }} />
                      <Typography variant="body2" fontWeight="bold">
                        General Queries
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

         
        </Grid>

    
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#f5f5f5", py: 4, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          © {new Date().getFullYear()} Lokmanya Tilak College of Engineering — LTCE Blog Team
        </Typography>
      </Box>
    </Box>
  );
};

export default Contact;
