import { User } from '../context/AuthContext';

export interface Reservation {
  id: number;
  restaurantId: number;
  restaurantName: string;
  date: string;
  time: string;
  peopleCount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
}


const mockReservations: Reservation[] = [
  {
    id: 1,
    restaurantId: 1,
    restaurantName: 'Italian Delights',
    date: '2023-07-15',
    time: '19:00',
    peopleCount: 2,
    status: 'completed'
  },
  {
    id: 2,
    restaurantId: 3,
    restaurantName: 'Burger Haven',
    date: '2023-08-22',
    time: '20:30',
    peopleCount: 4,
    status: 'completed'
  },
  {
    id: 3,
    restaurantId: 2,
    restaurantName: 'Sushi Paradise',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
    time: '18:30',
    peopleCount: 2,
    status: 'upcoming'
  },
  {
    id: 4,
    restaurantId: 4,
    restaurantName: 'Spice Garden',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    time: '19:00',
    peopleCount: 6,
    status: 'upcoming'
  }
];

// Fetch user reservations
export const getUserReservations = async (user: User): Promise<Reservation[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  return [...mockReservations];
};

// Update reservation
export const updateReservation = async (
  reservationId: number,
  updates: Partial<Omit<Reservation, 'id' | 'restaurantId' | 'restaurantName'>>
): Promise<Reservation> => {
 
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const reservation = mockReservations.find(r => r.id === reservationId);
  if (!reservation) {
    throw new Error('Reservation not found');
  }
  
  const updatedReservation = { ...reservation, ...updates };
  
 
  const index = mockReservations.findIndex(r => r.id === reservationId);
  mockReservations[index] = updatedReservation;
  
  return updatedReservation;
};

// Cancel reservation
export const cancelReservation = async (reservationId: number): Promise<void> => {

  await new Promise(resolve => setTimeout(resolve, 800));
  
  const index = mockReservations.findIndex(r => r.id === reservationId);
  if (index === -1) {
    throw new Error('Reservation not found');
  }
  
  // Update status to cancelled
  mockReservations[index] = {
    ...mockReservations[index],
    status: 'cancelled'
  };
}; 