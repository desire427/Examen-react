import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArticleForm from '../../ArticleForm'; // Chemin corrigé

function ArticleCreate() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('Vous devez être connecté pour créer un article.');
                navigate('/login');
                return;
            }

            await axios.post('http://127.0.0.1:8000/api/articles/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('Article créé avec succès !');
            navigate('/dashboard'); // Rediriger vers le tableau de bord après la création
        } catch (error) {
            console.error('Erreur lors de la création de l\'article:', error.response ? error.response.data : error.message);
            alert('Échec de la création de l\'article: ' + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-soft border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900">Créer un nouvel article</h2>
                <p className="mt-2 text-sm text-slate-600">Remplissez les champs ci-dessous pour rédiger votre article.</p>
            <ArticleForm onSubmit={handleSubmit} />
            </div>
        </main>
    );
}

export default ArticleCreate;