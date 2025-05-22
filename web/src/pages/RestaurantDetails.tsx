import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Box,
  Divider,
  Chip,
  Paper,
  Rating,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  LocationOn,
  AccessTime,
  Phone,
  ArrowBack,
  Restaurant as RestaurantIcon,
  AttachMoney,
  BrokenImage,
  FastfoodOutlined
} from '@mui/icons-material';
import { Restaurant, MenuItem, getRestaurantById } from '../services/restaurantService';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`restaurant-tabpanel-${index}`}
      aria-labelledby={`restaurant-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [imgError, setImgError] = useState(false);
  
  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!id) {
        setError('Restaurant ID is missing');
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const restaurantId = parseInt(id);
        const data = await getRestaurantById(restaurantId);
        
        if (!data) {
          setError('Restaurant not found');
        } else {
          setRestaurant(data);
        }
      } catch (err) {
        console.error('Error fetching restaurant details:', err);
        setError('Failed to load restaurant details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurant();
  }, [id]);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  // Group menu items by category
  const getMenuCategories = () => {
    if (!restaurant?.menuItems) return [];
    
    const categories: Set<string> = new Set();
    restaurant.menuItems.forEach(item => {
      if (item.category) {
        categories.add(item.category);
      }
    });
    
    return Array.from(categories);
  };
  
  const getMenuItemsByCategory = (category: string) => {
    if (!restaurant?.menuItems) return [];
    
    return restaurant.menuItems.filter(item => item.category === category);
  };
  
  // Handle image loading errors
  const handleImageError = () => {
    setImgError(true);
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box mt={2}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }
  
  if (!restaurant) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="info">Restaurant not found</Alert>
        <Box mt={2}>
          <Button variant="outlined" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }
  
  const menuCategories = getMenuCategories();
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      
      <Card sx={{ mb: 4 }}>
        {imgError ? (
          <Box
            sx={{
              height: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'grey.200'
            }}
          >
            <BrokenImage sx={{ fontSize: 80, color: 'text.secondary' }} />
          </Box>
        ) : (
          <CardMedia
            component="img"
            height="300"
            image={restaurant?.image || ''}
            alt={restaurant?.name || 'Restaurant'}
            onError={handleImageError}
            sx={{ objectFit: 'cover' }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {restaurant.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating value={restaurant.rating || 0} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {restaurant.rating} / 5
            </Typography>
            <Chip 
              label={restaurant.cuisine} 
              variant="outlined" 
              size="small" 
              sx={{ ml: 2 }} 
            />
            <Chip 
              label={restaurant.priceRange} 
              variant="outlined" 
              size="small" 
              sx={{ ml: 1 }} 
              icon={<AttachMoney fontSize="small" />}
            />
          </Box>
          
          <Typography variant="body1" paragraph>
            {restaurant.description}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <LocationOn color="primary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {restaurant.location}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Phone color="primary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {restaurant.phone}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <AccessTime color="primary" />
                <Typography variant="body1" sx={{ ml: 1 }}>
                  {restaurant.openingHours}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => navigate(`/reservation/${restaurant.id}`)}
            >
              Make a Reservation
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="restaurant details tabs"
            centered
          >
            <Tab label="Menu" icon={<RestaurantIcon />} id="restaurant-tab-0" />
          </Tabs>
        </Box>
        
        <TabPanel value={tabValue} index={0}>
          {menuCategories.length === 0 ? (
            <Typography variant="body1" align="center">
              No menu items available
            </Typography>
          ) : (
            <>
              {menuCategories.map((category, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {category}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <List>
                    {getMenuItemsByCategory(category).map((item) => (
                      <ListItem key={item.id} alignItems="flex-start" sx={{ py: 2 }}>
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            alt={item.name}
                            src={item.image}
                            sx={{ width: 80, height: 80, mr: 2, bgcolor: 'grey.200' }}
                            imgProps={{ 
                              onError: (e) => {
                                (e.target as HTMLImageElement).onerror = null;
                                (e.target as HTMLImageElement).style.display = 'none';
                                (e.currentTarget as HTMLImageElement).parentElement!.appendChild(
                                  Object.assign(document.createElement('div'), {
                                    innerHTML: '<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24"><path d="M21 5v6.59l-3-3.01-4 4.01-4-4-4 4-3-3.01V5c0-1.1.9-2 2-2h14c1.1 0 2 .9 2 2zm-3 6.42 3 3.01V19c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-6.58l3 2.99 4-4 4 4 4-3.99z"></path></svg>',
                                    style: 'display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: rgba(0, 0, 0, 0.6);'
                                  })
                                );
                              }
                            }}
                          >
                            <FastfoodOutlined />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="subtitle1" component="span">
                                {item.name}
                              </Typography>
                              <Typography variant="subtitle1" component="span" color="primary">
                                {item.price}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ))}
            </>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default RestaurantDetails; 