import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  IconButton
} from '@mui/material';
import { Search, LocationOn, Info, BrokenImage } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Restaurant, getAllRestaurants, searchRestaurants } from '../services/restaurantService';

const Home = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nameQuery, setNameQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  
  // Load all restaurants on component mount
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await getAllRestaurants();
        setRestaurants(data);
        setFilteredRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
        setError('Failed to load restaurants. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurants();
  }, []);
  
  // Handle image loading errors
  const handleImageError = (restaurantId: number) => {
    setImageErrors(prev => ({
      ...prev,
      [restaurantId]: true
    }));
  };
  
  // Handle search
  const handleSearch = async () => {
    try {
      setLoading(true);
      const results = await searchRestaurants(nameQuery, locationQuery);
      setFilteredRestaurants(results);
    } catch (err) {
      console.error('Error searching restaurants:', err);
      setError('Failed to search restaurants. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'nameQuery') {
      setNameQuery(value);
    } else if (name === 'locationQuery') {
      setLocationQuery(value);
    }
  };
  
  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          pt: 8,
          pb: 6,
          textAlign: 'center'
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Find your table for any occasion
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Book your favorite restaurant or discover new places to dine out!
        </Typography>
        
        <Box
          component="form"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mt: 4,
            mb: 4
          }}
        >
          <TextField
            placeholder="Search by restaurant name or cuisine"
            name="nameQuery"
            value={nameQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 300 }}
          />
          <TextField
            placeholder="Location"
            name="locationQuery"
            value={locationQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOn />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            disabled={loading}
          >
            Search
          </Button>
        </Box>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Typography
        component="h2"
        variant="h4"
        align="center"
        color="text.primary"
        sx={{ mb: 4 }}
      >
        {nameQuery || locationQuery ? 'Search Results' : 'All Restaurants'}
      </Typography>
      
      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : filteredRestaurants.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No restaurants found matching your search criteria.
        </Alert>
      ) : (
        <Grid container spacing={4}>
          {filteredRestaurants.map((restaurant) => (
            <Grid item key={restaurant.id} xs={12} sm={6} md={3}>
              <Card
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: '0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 3
                  }
                }}
              >
                {imageErrors[restaurant.id] ? (
                  <Box
                    sx={{
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'grey.200'
                    }}
                  >
                    <BrokenImage sx={{ fontSize: 60, color: 'text.secondary' }} />
                  </Box>
                ) : (
                  <CardMedia
                    component="img"
                    height="200"
                    image={restaurant.image}
                    alt={restaurant.name}
                    onError={() => handleImageError(restaurant.id)}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {restaurant.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {restaurant.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {restaurant.cuisine} • {restaurant.priceRange}
                  </Typography>
                  <Typography noWrap>
                    {restaurant.description.substring(0, 80)}...
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                  <Button 
                    size="small"
                    startIcon={<Info />}
                    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                  >
                    Details
                  </Button>
                  <Button 
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => navigate(`/reservation/${restaurant.id}`)}
                  >
                    Reserve
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Home; 