import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Bienvenue sur ton blog personnel
          </h1>
          <p className="mt-4 max-w-xl text-slate-600">
            Gère tes articles, développe ton réseau d'amis et publie facilement du contenu
            en quelques clics. Commence par te connecter ou créer un compte.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/login"
              className="btn btn-primary"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="btn btn-secondary"
            >
              Inscription
            </Link>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-soft border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Fonctionnalités clés</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                ✓
              </span>
              <span>Création, modification et suppression d'articles.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                ✓
              </span>
              <span>Gestion d'amis, demandes et blocages.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                ✓
              </span>
              <span>Articles publics/privés et commentaires.</span>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
