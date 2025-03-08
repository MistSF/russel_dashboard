import React, { useState, useEffect } from 'react';
import api from './api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            window.location.href = "/dashboard"
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { username, password });
            if (response.status == 200) {
                localStorage.setItem("token", response.data.token);
                window.location.href = '/dashboard';
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error('Erreur lors de la tentative de connexion:', error);
            setError('An error occurred. Please try again.');
        }
    }; /* */

    return (
        <div>
            <h1>Login</h1>
            <div>
                Vous pouvez trouvez consulter et gérer les catways ainsi que les réservations
            </div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Username:</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
