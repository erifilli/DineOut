import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format } from 'date-fns';

// In a real app, this would come from an API
const mockFetchRestaurant = (id: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Use direct image URLs instead of dynamic queries
      const imageUrls: {[key: string]: string} = {
        '1': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop',
        '2': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1470&auto=format&fit=crop',
        '3': 'https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?q=80&w=1470&auto=format&fit=crop',
        '4': 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1470&auto=format&fit=crop',
        '5': 'https://images.unsplash.com/photo-1600891964092-304a2480248f?q=80&w=1470&auto=format&fit=crop'
      };
      
      resolve({
        id: parseInt(id),
        name: id === '1' ? 'Italian Delights' : 
              id === '2' ? 'Sushi Paradise' : 
              id === '3' ? 'Burger Haven' : 
              id === '4' ? 'Spice Garden' : 'Restaurant',
        location: id === '1' ? 'Kolonaki, Athens' :
                 id === '2' ? 'Glyfada, Athens' :
                 id === '3' ? 'Monastiraki, Athens' :
                 id === '4' ? 'Psiri, Athens' : 'Athens',
        description: 'Delicious cuisine in a wonderful atmosphere.',
        image: imageUrls[id] || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1374&auto=format&fit=crop'
      });
    }, 500);
  });
};

interface ReservationFormData {
  date: Date | null;
  time: Date | null;
  partySize: string;
  specialRequests: string;
}

const Reservation = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  const [formData, setFormData] = useState<ReservationFormData>({
    date: new Date(),
    time: null,
    partySize: '2',
    specialRequests: '',
  });

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (!restaurantId) {
        setError('No restaurant selected');
        setLoading(false);
        return;
      }
      
      try {
        const data = await mockFetchRestaurant(restaurantId);
        setRestaurant(data);
      } catch (err) {
        setError('Failed to load restaurant details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurant();
  }, [restaurantId]);

  const handleDateChange = (newDate: Date | null) => {
    setFormData({ ...formData, date: newDate });
  };

  const handleTimeChange = (newTime: Date | null) => {
    setFormData({ ...formData, time: newTime });
  };

  const handlePartySizeChange = (event: SelectChangeEvent) => {
    setFormData({ ...formData, partySize: event.target.value });
  };

  const handleSpecialRequestsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, specialRequests: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.date || !formData.time) {
      setError('Please select both date and time');
      return;
    }
    
    setError('');
    setFormSubmitting(true);
    
    try {
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (err) {
      setError('Failed to make reservation. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error && !restaurant) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
      </Container>
    );
  }

  if (formSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="success">
          Your reservation has been successfully booked! You will be redirected to the home page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Make a Reservation
      </Typography>
      
      {restaurant && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {restaurant.name}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {restaurant.location}
            </Typography>
            <Typography variant="body2">
              {restaurant.description}
            </Typography>
          </CardContent>
        </Card>
      )}
      
      <Paper elevation={3} sx={{ p: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        
        <Box component="form" onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Reservation Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    }
                  }}
                  disablePast
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Reservation Time"
                  value={formData.time}
                  onChange={handleTimeChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel id="party-size-label">Party Size</InputLabel>
                  <Select
                    labelId="party-size-label"
                    id="party-size"
                    value={formData.partySize}
                    label="Party Size"
                    onChange={handlePartySizeChange}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </MenuItem>
                    ))}
                    <MenuItem value="11">More than 10 people</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Additional Information
                </Typography>
                <TextField
                  fullWidth
                  id="special-requests"
                  label="Special Requests (optional)"
                  multiline
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleSpecialRequestsChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/')}
                  disabled={formSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={formSubmitting}
                >
                  {formSubmitting ? 'Submitting...' : 'Complete Reservation'}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Paper>
    </Container>
  );
};

export default Reservation; 