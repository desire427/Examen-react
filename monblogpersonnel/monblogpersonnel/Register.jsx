// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Tentez d'abord avec /api/register/ si /api/accounts/register/ donne une 404.
            // Vérifiez bien votre fichier monblogpersonnel_backend/urls.py
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                full_name: fullName,
                username: username,
                password: password,
            });
            
            console.log('Inscription réussie:', response.data);
            alert('Compte créé avec succès ! Connectez-vous maintenant.');
            navigate('/login'); // Redirection vers la page de connexion
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            if (error.response?.status === 404) {
                alert("Erreur 404 : Le serveur ne trouve pas la route d'inscription. Vérifiez vos URLs Django.");
            } else {
                alert("L'inscription a échoué : " + (error.response?.data?.detail || "Vérifiez vos informations"));
            }
        }
    };

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-soft border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">Créer un compte</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Remplis les informations ci-dessous pour créer ton compte et commencer à publier.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label className="text-sm font-medium text-slate-700">Nom complet</label>
                        <input
                            className="input mt-2"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Ex. Jean Dupont"
                            required
                        />
                    </div>
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
                        Créer mon compte
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-600">
                    Tu as déjà un compte ?{' '}
                    <Link to="/login" className="font-medium text-brand-600 hover:text-brand-700">
                        Connecte-toi
                    </Link>
                    .
                </p>
            </div>
        </main>
    );
}

export default Register;
