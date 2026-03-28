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

    // Récupération de l'utilisateur connecté depuis le localStorage
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    
    // Vérification : est-ce que je suis l'auteur de cet article ?
    const isOwner = currentUser && article && currentUser.id === article.author;

    return (
        <main className="container mx-auto px-4 py-12 flex flex-col items-center">
            <ArticleView article={article} />
            
            {isOwner && (
                <Link to={`/articles/${article.id}/edit`} className="btn btn-secondary mt-4">
                    Modifier l'article
                </Link>
            )}
        </main>
    );
}

export default ArticlePage;