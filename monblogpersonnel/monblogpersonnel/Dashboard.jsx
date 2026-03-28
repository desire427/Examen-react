// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ArticleList from './ArticleList';
import FriendList from './FriendList';

function Dashboard() {
    return (
        <main className="container mx-auto px-4 py-12">
            <header className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold text-slate-900">Tableau de bord</h1>
                    <p className="mt-1 text-sm text-slate-600">
                        Bienvenue dans ton espace personnel. Retrouve tes articles et tes amis ici.
                    </p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link 
                        to="/dashboard/create-article" 
                        className="btn btn-primary"
                    >
                        Créer un article
                    </Link>
                    <button className="btn btn-secondary">Paramètres</button>
                </div>
            </header>

            <div className="grid gap-8 lg:grid-cols-2">
                <section className="card">
                    <h2 className="text-xl font-semibold text-slate-900">Mes articles</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Consultation rapide de tes derniers articles et brouillons.
                    </p>
                    <div className="mt-6">
                        <ArticleList />
                    </div>
                </section>

                <section className="card">
                    <h2 className="text-xl font-semibold text-slate-900">Mes amis</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Suis tes amis et gère les demandes en attente.
                    </p>
                    <div className="mt-6">
                        <FriendList />
                    </div>
                </section>
            </div>
        </main>
    );
}
export default Dashboard;
