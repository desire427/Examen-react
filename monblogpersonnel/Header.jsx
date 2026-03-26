// src/components/Common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
                <Link to="/" className="flex items-center gap-2 text-brand-700">
                    <span className="block h-9 w-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-soft" />
                    <span className="text-xl font-semibold">MonBlog</span>
                </Link>
                <nav className="flex items-center gap-2">
                    <Link
                        to="/"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        Accueil
                    </Link>
                    <Link
                        to="/dashboard"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        Tableau de bord
                    </Link>
                    <Link
                        to="/login"
                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    >
                        Connexion
                    </Link>
                    <Link
                        to="/register"
                        className="rounded-lg border border-brand-500 bg-white px-3 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                    >
                        Inscription
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;