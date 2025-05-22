import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Card,
  CardContent,
  CardActions,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { 
  Person, 
  Email, 
  CalendarMonth, 
  Edit, 
  ArrowForward,
  RestaurantMenu,
  History
} from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset form data
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    
    setSuccess('Profile updated successfully!');
    setEditing(false);
    
    
    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">Please sign in to view your profile.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Profile
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 3 }}>{success}</Alert>}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  margin: '0 auto 16px',
                }}
              >
                {user.firstName.charAt(0).toUpperCase()}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Member since {new Date().getFullYear()}
              </Typography>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                startIcon={<Edit />}
                onClick={handleEdit}
                fullWidth
                disabled={editing}
              >
                Edit Profile
              </Button>
            </CardActions>
          </Card>

          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/reservations')}>
                  <ListItemIcon>
                    <CalendarMonth />
                  </ListItemIcon>
                  <ListItemText primary="My Reservations" />
                  <ArrowForward fontSize="small" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={() => navigate('/')}>
                  <ListItemIcon>
                    <RestaurantMenu />
                  </ListItemIcon>
                  <ListItemText primary="Find Restaurants" />
                  <ArrowForward fontSize="small" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton disabled>
                  <ListItemIcon>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary="Order History" />
                  <ArrowForward fontSize="small" />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              {editing ? 'Edit Profile Information' : 'Profile Information'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    InputProps={{
                      startAdornment: <Person color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                    required
                    InputProps={{
                      startAdornment: <Email color="action" sx={{ mr: 1 }} />
                    }}
                  />
                </Grid>
                
                {editing && (
                  <>
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                      <Button variant="outlined" onClick={handleCancel}>
                        Cancel
                      </Button>
                      <Button type="submit" variant="contained">
                        Save Changes
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          </Paper>
          
          <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Account Security
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} disabled>
              Change Password
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile; 