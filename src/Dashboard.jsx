import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import Nav from './Nav';

const Dashboard = () => {
    const [catways, setCatways] = useState([]);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const catwaysResponse = await api.get('/catways');
                const reservationsResponse = await api.get('/catways/0/reservations');
                setCatways(catwaysResponse.data);
                setReservations(reservationsResponse.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Nav />
            <h1>Dashboard</h1>
            <h2>Catways</h2>
            <ul>
                {catways.map(catway => (
                    <li key={catway.catwayNumber}>
                        Numéro: {catway.catwayNumber}, Type: {catway.catwayType}, État: {catway.catwayState}
                    </li>
                ))}
            </ul>
            <h2>Réservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation._id}>
                        Catway: {reservation.catwayNumber}, Client: {reservation.clientName}, Bateau: {reservation.boatName}, Début: {reservation.startDate}, Fin: {reservation.endDate}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
