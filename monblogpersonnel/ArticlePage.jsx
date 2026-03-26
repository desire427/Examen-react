// src/pages/ArticlePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import ArticleView from './ArticleView.jsx';
import Loading from './Loading.jsx';

function ArticlePage() {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}/`, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    }
                });
                setArticle(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération de l'article:", err);
                setError("Impossible de charger l'article.");
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) return <Loading />;
    if (error) return <div className="container mx-auto px-4 py-12 text-red-600">{error}</div>;
    if (!article) return null;

    return (
        <main className="container mx-auto px-4 py-12 flex flex-col items-center">
            <ArticleView article={article} /> {/* Assuming ArticleView is in src/components/Articles/ArticleView.jsx */}
            {/* Add an Edit button, visible only if the current user is the author */}
            {/* You'll need to implement logic to check if the current user is the author */}
            {/* For now, let's assume any logged-in user can see the edit button */}
            <Link to={`/articles/${article.id}/edit`} className="btn btn-secondary mt-4">
                Modifier l'article
            </Link>
        </main>
    );
}

export default ArticlePage;