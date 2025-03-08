import React, { useState, useEffect } from 'react';
import api from './api'; // Your Axios instance
import Nav from './Nav';

const CatwayPage = () => {
  const [catways, setCatways] = useState([]);
  const [catwayDetails, setCatwayDetails] = useState(null);
  const [newCatway, setNewCatway] = useState({ catwayNumber: '', catwayType: '', catwayState: '' });
  const [updateCatway, setUpdateCatway] = useState({ id: '', catwayState: '' });
  let detailNumber = 1;

  // Fetch all catways
  const fetchCatways = async () => {
    try {
      const response = await api.get('/catways');
      setCatways(response.data);
    } catch (error) {
      console.error('Error fetching catways:', error);
    }
  };

  // Fetch a single catway by ID
  const fetchCatwayById = async (id) => {
    try {
      const response = await api.get(`/catways/${id}`);
      setCatwayDetails(response.data);
    } catch (error) {
      console.error('Error fetching catway:', error);
    }
  };

  // Create a new catway
  const createCatway = async () => {
    try {
      await api.post('/catways', newCatway);
      fetchCatways(); // Refresh the list after creation
    } catch (error) {
      console.error('Error creating catway:', error);
    }
  };

  // Update a catway by ID
  const updateCatwayById = async () => {
    try {
      await api.put(`/catways/${updateCatway.id}`, { catwayState: updateCatway.catwayState });
      fetchCatways(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating catway:', error);
    }
  };

  // Delete a catway by ID
  const deleteCatwayById = async (id) => {
    try {
      await api.delete(`/catways/${id}`);
      fetchCatways(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting catway:', error);
    }
  };

  useEffect(() => {
    fetchCatways();
  }, []);

  return (
    <div>
        <Nav />
        <h1>Catways</h1>

        <h2>Create Catway</h2>
        <input type="text" placeholder="Catway Number" value={newCatway.catwayNumber} onChange={(e) => setNewCatway({ ...newCatway, catwayNumber: e.target.value })} />
        <input type="text" placeholder="Catway Type" value={newCatway.catwayType} onChange={(e) => setNewCatway({ ...newCatway, catwayType: e.target.value })} />
        <input type="text" placeholder="Catway State" value={newCatway.catwayState} onChange={(e) => setNewCatway({ ...newCatway, catwayState: e.target.value })} />
        <button onClick={createCatway}>Create</button>

        <div>
            <h2>Catway Details</h2>
            <input type="text" placeholder="Catway ID" onChange={(e) => {detailNumber = e.target.value} } />
            <button onClick={() => fetchCatwayById(detailNumber)}>Details</button>
            {catwayDetails && (
            <div>
                <p>Number: {catwayDetails.catwayNumber}</p>
                <p>Type: {catwayDetails.catwayType}</p>
                <p>State: {catwayDetails.catwayState}</p>      
            </div>
        )}
        </div>

        <h2>Update Catway</h2>
        <input type="text" placeholder="Catway ID" value={updateCatway.id} onChange={(e) => setUpdateCatway({ ...updateCatway, id: e.target.value })} />
        <input type="text" placeholder="New Catway State" value={updateCatway.catwayState} onChange={(e) => setUpdateCatway({ ...updateCatway, catwayState: e.target.value })} />
        <button onClick={updateCatwayById}>Update</button>
        
        <ul>
            {catways.map(catway => (
            <li key={catway._id}>
                {catway.catwayNumber} - {catway.catwayType} - {catway.catwayState}
                <button onClick={() => fetchCatwayById(catway.catwayNumber)}>Details</button>
                <button onClick={() => deleteCatwayById(catway._id)}>Delete</button>
            </li>
            ))}
        </ul>
    </div>
  );
};

export default CatwayPage;
