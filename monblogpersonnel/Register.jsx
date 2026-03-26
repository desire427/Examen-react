// src/components/Auth/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement registration logic here (API call)
        console.log('Registered', { fullName, username });
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
