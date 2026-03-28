import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArticleForm from '../../ArticleForm'; // Chemin corrigé
import Loading from '../../Loading'; // Chemin corrigé

function ArticleEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setArticle(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Erreur lors de la récupération de l'article:", err);
                setError("Impossible de charger l'article pour modification.");
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id, navigate]);

    const handleSubmit = async (formData) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.put(`http://127.0.0.1:8000/api/articles/${id}/`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('Article mis à jour avec succès !');
            navigate(`/articles/${id}`); // Rediriger vers la page de détails de l'article
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'article:', error.response ? error.response.data : error.message);
            alert('Échec de la mise à jour de l\'article: ' + (error.response?.data?.detail || error.message));
        }
    };

    if (loading) return <Loading />;
    if (error) return <div className="container mx-auto px-4 py-12 text-red-600">{error}</div>;
    if (!article) return null; // Should not happen if loading and error are handled

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-soft border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">Modifier l'article</h2>
                <p className="mt-2 text-sm text-slate-600">Modifiez les champs ci-dessous pour mettre à jour votre article.</p>
                <ArticleForm initialData={article} onSubmit={handleSubmit} isEditing={true} />
            </div>
        </main>
    );
}

export default ArticleEdit;