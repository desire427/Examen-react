// src/components/Articles/ArticleView.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ArticleView({ article }) {
    const [commentText, setCommentText] = useState('');
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    const isOwner = currentUser && article && (currentUser.id === article.author || currentUser.username === article.author_username);

    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.post(`http://127.0.0.1:8000/api/articles/${article.id}/comment/`, 
                { content: commentText },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            alert('Commentaire ajouté !');
            setCommentText('');
        } catch (err) {
            console.error("Erreur lors de l'envoi du commentaire:", err);
            alert("Impossible d'ajouter le commentaire.");
        }
    };

    return (
        <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <header className="mb-6">
                <h1 className="text-3xl font-semibold text-slate-900">{article?.title || 'Titre de l\'article'}</h1>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <span>Par <span className="font-medium text-slate-900">{article?.author_username}</span></span>
                    {isOwner && (
                        <span className="rounded bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-700">
                            Moi
                        </span>
                    )}
                    <span>•</span>
                    <span>Publié le {article?.created_at ? new Date(article.created_at).toLocaleDateString() : '—'}</span>
                </div>
            </header>
            <div className="max-w-none space-y-6 text-slate-700">
                <p>{article?.content || 'Aucun contenu pour le moment. Ajoute du texte pour voir un aperçu.'}</p>
            </div>

            {article?.allow_comments && (
                <div className="mt-12 border-t border-slate-200 pt-8">
                    <h3 className="text-xl font-semibold text-slate-900 mb-6">Commentaires</h3>
                    
                    <div className="space-y-4 mb-8">
                        <p className="text-sm text-slate-500 italic">Aucun commentaire pour le moment.</p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4">
                        <textarea 
                            className="input w-full h-24 bg-white" 
                            placeholder="Écrire un commentaire..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <button onClick={handleCommentSubmit} className="btn btn-primary mt-3 text-sm">
                            Envoyer le commentaire
                        </button>
                    </div>
                </div>
            )}
        </article>
    );
}

export default ArticleView;
