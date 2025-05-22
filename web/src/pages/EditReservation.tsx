import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parse } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import { Reservation, updateReservation } from '../services/reservationService';

const EditReservation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);
  
  const [reservation, setReservation] = useState<Reservation | null>(
    location.state?.reservation || null
  );
  
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);
  const [peopleCount, setPeopleCount] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Check authentication and get reservation data
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    if (!id) {
      setError('No reservation ID provided');
      return;
    }

    if (!reservation) {
      setError('Reservation not found');
      return;
    }

    // Parse string date and time into Date objects
    setDate(new Date(reservation.date));
    setTime(parse(reservation.time, 'HH:mm', new Date()));
    setPeopleCount(reservation.peopleCount.toString());
  }, [id, isAuthenticated, navigate, reservation]);

  const handlePeopleCountChange = (event: SelectChangeEvent) => {
    setPeopleCount(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!date || !time || !peopleCount) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!reservation) {
      setError('Reservation not found');
      return;
    }
    
    setSaving(true);
    setError('');
    
    try {
      // Format date and time for API
      const formattedDate = format(date, 'yyyy-MM-dd');
      const formattedTime = format(time, 'HH:mm');
      
      // Send update to API
      const updatedReservation = await updateReservation(reservation.id, {
        date: formattedDate,
        time: formattedTime,
        peopleCount: parseInt(peopleCount),
      });
      
      setReservation(updatedReservation);
      setSuccess(true);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/reservations');
      }, 3000);
    } catch (err) {
      console.error('Error updating reservation:', err);
      setError('Failed to update reservation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!reservation) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">
          Reservation not found or you do not have permission to edit it.
        </Alert>
        <Button 
          variant="contained" 
          sx={{ mt: 2 }}
          onClick={() => navigate('/reservations')}
        >
          Back to Reservations
        </Button>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (success) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="success">
          Your reservation has been successfully updated! You will be redirected to your reservations page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Reservation
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {reservation.restaurantName}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            Current reservation: {format(new Date(reservation.date), 'MMMM dd, yyyy')} at {reservation.time}
          </Typography>
        </CardContent>
      </Card>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="New Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
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
                  label="New Time"
                  value={time}
                  onChange={(newTime) => setTime(newTime)}
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
                  <InputLabel id="people-count-label">Number of People</InputLabel>
                  <Select
                    labelId="people-count-label"
                    id="people-count"
                    value={peopleCount}
                    label="Number of People"
                    onChange={handlePeopleCountChange}
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
              
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/reservations')}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={saving}
                >
                  {saving ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditReservation; 