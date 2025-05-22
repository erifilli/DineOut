import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { Edit, Delete, Event, AccessTime, People } from '@mui/icons-material';
import { AuthContext } from '../context/AuthContext';
import { 
  getUserReservations, 
  cancelReservation, 
  Reservation 
} from '../services/reservationService';
import { format, isPast, parseISO } from 'date-fns';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`reservations-tabpanel-${index}`}
      aria-labelledby={`reservations-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const UserReservations = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [tabValue, setTabValue] = useState(0);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/signin');
      return;
    }

    const fetchReservations = async () => {
      try {
        setLoading(true);
        const data = await getUserReservations(user);
        setReservations(data);
      } catch (err) {
        console.error('Error fetching reservations:', err);
        setError('Failed to load your reservations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user, isAuthenticated, navigate]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditReservation = (reservation: Reservation) => {
    navigate(`/edit-reservation/${reservation.id}`, { 
      state: { reservation } 
    });
  };

  const handleCancelDialogOpen = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
    setSelectedReservation(null);
  };

  const handleCancelReservation = async () => {
    if (!selectedReservation) return;
    
    try {
      setCancellingId(selectedReservation.id);
      await cancelReservation(selectedReservation.id);
      
      // Update the local state
      setReservations(prevReservations => 
        prevReservations.map(res => 
          res.id === selectedReservation.id 
            ? { ...res, status: 'cancelled' } 
            : res
        )
      );
      
    } catch (err) {
      console.error('Error cancelling reservation:', err);
      setError('Failed to cancel reservation. Please try again.');
    } finally {
      setCancellingId(null);
      handleCancelDialogClose();
    }
  };

  const getUpcomingReservations = () => {
    return reservations.filter(res => 
      res.status === 'upcoming' && !isPast(new Date(`${res.date}T${res.time}`))
    );
  };

  const getPastReservations = () => {
    return reservations.filter(res => 
      res.status === 'completed' || isPast(new Date(`${res.date}T${res.time}`))
    );
  };

  const getCancelledReservations = () => {
    return reservations.filter(res => res.status === 'cancelled');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Reservations
      </Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      <Paper elevation={3}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="reservation tabs"
          variant="fullWidth"
        >
          <Tab label={`Upcoming (${getUpcomingReservations().length})`} />
          <Tab label={`Past (${getPastReservations().length})`} />
          <Tab label={`Cancelled (${getCancelledReservations().length})`} />
        </Tabs>
        
        <TabPanel value={tabValue} index={0}>
          {getUpcomingReservations().length === 0 ? (
            <Typography variant="body1" align="center">
              You don't have any upcoming reservations.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Restaurant</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>People</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getUpcomingReservations().map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.restaurantName}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Event fontSize="small" sx={{ mr: 1 }} />
                          {format(new Date(reservation.date), 'MMM dd, yyyy')}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime fontSize="small" sx={{ mr: 1 }} />
                          {reservation.time}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <People fontSize="small" sx={{ mr: 1 }} />
                          {reservation.peopleCount}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <IconButton 
                          color="primary" 
                          onClick={() => handleEditReservation(reservation)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          onClick={() => handleCancelDialogOpen(reservation)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={1}>
          {getPastReservations().length === 0 ? (
            <Typography variant="body1" align="center">
              You don't have any past reservations.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Restaurant</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>People</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getPastReservations().map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.restaurantName}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Event fontSize="small" sx={{ mr: 1 }} />
                          {format(new Date(reservation.date), 'MMM dd, yyyy')}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTime fontSize="small" sx={{ mr: 1 }} />
                          {reservation.time}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <People fontSize="small" sx={{ mr: 1 }} />
                          {reservation.peopleCount}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label="Completed" 
                          color="success" 
                          size="small" 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
        
        <TabPanel value={tabValue} index={2}>
          {getCancelledReservations().length === 0 ? (
            <Typography variant="body1" align="center">
              You don't have any cancelled reservations.
            </Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Restaurant</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>People</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getCancelledReservations().map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>{reservation.restaurantName}</TableCell>
                      <TableCell>
                        {format(new Date(reservation.date), 'MMM dd, yyyy')}
                      </TableCell>
                      <TableCell>{reservation.time}</TableCell>
                      <TableCell>{reservation.peopleCount}</TableCell>
                      <TableCell>
                        <Chip 
                          label="Cancelled" 
                          color="error" 
                          size="small" 
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>
      </Paper>
      
      {/* Confirmation Dialog for Cancelling Reservation */}
      <Dialog
        open={cancelDialogOpen}
        onClose={handleCancelDialogClose}
      >
        <DialogTitle>Cancel Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel your reservation at {selectedReservation?.restaurantName} on {selectedReservation && format(new Date(selectedReservation.date), 'MMMM dd, yyyy')} at {selectedReservation?.time}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose} disabled={cancellingId !== null}>
            No, Keep It
          </Button>
          <Button 
            onClick={handleCancelReservation} 
            color="error" 
            disabled={cancellingId !== null}
          >
            {cancellingId !== null ? 'Cancelling...' : 'Yes, Cancel'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserReservations; 