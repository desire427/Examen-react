// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // You'll need to install axios: npm install axios

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/token/', { // Ajusté pour cohérence
                username,
                password,
            });
            console.log('Login successful:', response.data);
            // Store tokens and user info (e.g., in localStorage or context)
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // You might want to fetch user details with the access token here
            // For now, let's assume a successful login is enough to navigate
            navigate('/dashboard'); // Redirect to dashboard or home page
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            alert('Login failed: ' + (error.response?.data?.detail || 'Invalid credentials'));
        }
    };

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-soft border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">Connexion</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Renseigne ton nom d'utilisateur et ton mot de passe pour accéder à ton tableau de bord.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Nom d'utilisateur</label>
                        <input
                            className="input mt-2"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ex. utilisateur123"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-700">Mot de passe</label>
                        <input
                            className="input mt-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full">
                        Se connecter
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-600">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="font-medium text-brand-600 hover:text-brand-700">
                        Inscris-toi ici
                    </Link>
                    .
                </p>
            </div>
        </main>
    );
}

export default Login;
