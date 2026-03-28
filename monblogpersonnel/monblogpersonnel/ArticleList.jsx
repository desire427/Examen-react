// src/components/Dashboard/ArticleList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Récupérer les infos de l'utilisateur connecté
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get('http://127.0.0.1:8000/api/articles/', {
                    headers: {
                        // On envoie le token JWT si l'utilisateur est connecté pour voir ses articles privés
                        Authorization: token ? `Bearer ${token}` : '',
                    }
                });
                setArticles(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération des articles:", err);
                setError("Impossible de charger les articles.");
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) return <div className="p-4 text-slate-600">Chargement des articles...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Articles</h3>
                <span className="text-sm text-slate-500">{articles.length} articles</span>
            </div>

            <div className="space-y-4">
                {articles.map((article) => (
                    <div
                        key={article.id}
                        className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <Link to={`/articles/${article.id}`}>
                                <h4 className="text-base font-semibold text-slate-900 hover:text-brand-700 transition-colors">
                                    {article.title}
                                </h4>
                            </Link>
                            <p className="text-sm text-slate-600">
                                Par <span className="font-medium text-slate-900">{article.author_username}</span>
                                {currentUser && currentUser.username === article.author_username && (
                                    <span className="ml-2 rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                                        Moi
                                    </span>
                                )}
                                 • Modifié le {new Date(article.updated_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                    article.status === 'published'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : 'bg-amber-50 text-amber-700'
                                }`}
                            >
                                {article.status === 'published' ? 'Publié' : 'Brouillon'}
                            </span>
                            <Link to={`/articles/${article.id}`} className="btn btn-secondary text-xs">
                                Voir
                            </Link>
                        </div>
                    </div>
                ))}
                {articles.length === 0 && (
                    <p className="text-center text-slate-500 py-8">Aucun article trouvé.</p>
                )}
            </div>
        </div>
    );
}

export default ArticleList;
