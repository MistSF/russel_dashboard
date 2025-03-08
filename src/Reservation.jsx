import React, { useState, useEffect } from 'react';
import api from './api'; // Votre instance Axios
import Nav from './Nav';

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [reservationDetails, setReservationDetails] = useState(null);
  const [newReservation, setNewReservation] = useState({
    catwayNumber: '',
    clientName: '',
    boatName: '',
    startDate: '',
    endDate: ''
  });
  const [updateReservation, setUpdateReservation] = useState({
    id: '',
    catwayNumber: '',
    clientName: '',
    boatName: '',
    startDate: '',
    endDate: ''
  });

  // Fetch all reservations
  const fetchReservations = async () => {
    try {
      const response = await api.get('/catways/0/reservations');
      setReservations(response.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  // Fetch a single reservation by ID
  const fetchReservationById = async (id) => {
    try {
      const response = await api.get(`/catways/0/reservations/${id}`);
      setReservationDetails(response.data);
    } catch (error) {
      console.error('Error fetching reservation:', error);
    }
  };

  // Create a new reservation
  const createReservation = async () => {
    try {
      const response = await api.post('/catways/0/reservations', newReservation);
      setReservations([...reservations, response.data]);
      fetchReservations();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
  };

  // Update a reservation by ID
  const updateReservationById = async () => {
    try {
      const response = await api.put(`/catways/0/reservations/${updateReservation.id}`, updateReservation);
      setReservations(reservations.map(reservation => (reservation._id === updateReservation.id ? response.data : reservation)));
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  // Delete a reservation by ID
  const deleteReservationById = async (id) => {
    try {
      await api.delete(`/catways/0/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation._id !== id));
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
    <div>
        <Nav />
      <h1>Reservations</h1>

      <h2>Create Reservation</h2>
      <input type="text" placeholder="Catway Number" value={newReservation.catwayNumber} onChange={(e) => setNewReservation({ ...newReservation, catwayNumber: e.target.value })} />
      <input type="text" placeholder="Client Name" value={newReservation.clientName} onChange={(e) => setNewReservation({ ...newReservation, clientName: e.target.value })} />
      <input type="text" placeholder="Boat Name" value={newReservation.boatName} onChange={(e) => setNewReservation({ ...newReservation, boatName: e.target.value })} />
      <input type="date" placeholder="Start Date" value={newReservation.startDate} onChange={(e) => setNewReservation({ ...newReservation, startDate: e.target.value })} />
      <input type="date" placeholder="End Date" value={newReservation.endDate} onChange={(e) => setNewReservation({ ...newReservation, endDate: e.target.value })} />
      <button onClick={createReservation}>Create</button>

      {reservationDetails && (
        <div>
          <h2>Reservation Details</h2>
          <p>Catway Number: {reservationDetails.catwayNumber}</p>
          <p>Client Name: {reservationDetails.clientName}</p>
          <p>Boat Name: {reservationDetails.boatName}</p>
          <p>Start Date: {reservationDetails.startDate}</p>
          <p>End Date: {reservationDetails.endDate}</p>
          <p>ID : {reservationDetails._id}</p>
        </div>
      )}

      <h2>Update Reservation</h2>
      <input type="text" placeholder="Reservation ID" value={updateReservation.id} onChange={(e) => setUpdateReservation({ ...updateReservation, id: e.target.value })} />
      <input type="text" placeholder="Catway Number" value={updateReservation.catwayNumber} onChange={(e) => setUpdateReservation({ ...updateReservation, catwayNumber: e.target.value })} />
      <input type="text" placeholder="Client Name" value={updateReservation.clientName} onChange={(e) => setUpdateReservation({ ...updateReservation, clientName: e.target.value })} />
      <input type="text" placeholder="Boat Name" value={updateReservation.boatName} onChange={(e) => setUpdateReservation({ ...updateReservation, boatName: e.target.value })} />
      <input type="date" placeholder="Start Date" value={updateReservation.startDate} onChange={(e) => setUpdateReservation({ ...updateReservation, startDate: e.target.value })} />
      <input type="date" placeholder="End Date" value={updateReservation.endDate} onChange={(e) => setUpdateReservation({ ...updateReservation, endDate: e.target.value })} />
      <button onClick={updateReservationById}>Update</button>

      <ul>
        {reservations.map(reservation => (
          <li key={reservation._id}>
            {reservation.clientName} - {reservation.boatName} - {reservation.startDate} - {reservation.endDate}
            <button onClick={() => fetchReservationById(reservation._id)}>Details</button>
            <button onClick={() => deleteReservationById(reservation._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationPage;
