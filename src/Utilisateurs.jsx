import React, { useState, useEffect } from 'react';
import api from "./api"
import Nav from './Nav';
const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });
    const [updatedUser, setUpdatedUser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    };

    const fetchUserByEmail = async (email) => {
        try {
            const response = await api.get(`/users/${email}`);
            setUser(response.data);
        } catch (error) {
            console.error(`Erreur lors de la récupération de l'utilisateur avec l'email ${email}:`, error);
        }
    };

    const createUser = async () => {
        try {
            await api.post('/users', newUser);
            fetchUsers();
            setNewUser({ username: '', email: '', password: '' });
        } catch (error) {
            console.error("Erreur lors de la création d'un nouvel utilisateur:", error);
        }
    };

    const updateUser = async (email) => {
        try {
            await api.put(`/users/${email}`, updatedUser);
            fetchUsers();
            setUpdatedUser({ username: '', email: '', password: '' });
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        }
    };

    const deleteUser = async (email) => {
        try {
            await api.delete(`/users/${email}`);
            fetchUsers();
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
    };

    return (
        <div>
            <Nav />
            <h1>Gestion des Utilisateurs</h1>

            <h2>Recherche d'un Utilisateur par Email</h2>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez l'email" />
            <button onClick={() => fetchUserByEmail(email)}>Rechercher</button>
            {user && (
                <div>
                    <h3>Utilisateur Trouvé:</h3>
                    <p>{user.username} - {user.email}</p>
                </div>
            )}

            <h2>Créer un Nouvel Utilisateur</h2>
            <input type="text" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} placeholder="Nom d'utilisateur" />
            <input type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} placeholder="Email" />
            <input type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} placeholder="Mot de passe" />
            <button onClick={createUser}>Créer</button>

            <h2>Mettre à Jour un Utilisateur</h2>
            <input type="email" value={updatedUser.email} onChange={(e) => setUpdatedUser({...updatedUser, email: e.target.value})} placeholder="Email actuel de l'utilisateur" />
            <input type="text" value={updatedUser.username} onChange={(e) => setUpdatedUser({...updatedUser, username: e.target.value})} placeholder="Nouveau nom d'utilisateur" />
            <input type="password" value={updatedUser.password} onChange={(e) => setUpdatedUser({...updatedUser, password: e.target.value})} placeholder="Nouveau mot de passe" />
            <button onClick={() => updateUser(updatedUser.email)}>Mettre à Jour</button>

            <h2>Supprimer un Utilisateur</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email de l'utilisateur à supprimer" />
            <button onClick={() => deleteUser(email)}>Supprimer</button>
            
            <h2>Liste des Utilisateurs</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserPage;
