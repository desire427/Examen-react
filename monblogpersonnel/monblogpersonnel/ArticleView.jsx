// src/components/Articles/ArticleView.jsx
import React from 'react';

function ArticleView({ article }) {
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
    const isOwner = currentUser && article && (currentUser.id === article.author || currentUser.username === article.author_username);

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
        </article>
    );
}

export default ArticleView;
