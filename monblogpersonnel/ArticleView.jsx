// src/components/Articles/ArticleView.jsx
import React from 'react';

function ArticleView({ article }) {
    return (
        <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <header className="mb-6">
                <h1 className="text-3xl font-semibold text-slate-900">{article?.title || 'Titre de l\'article'}</h1>
                <p className="mt-2 text-sm text-slate-600">Publié le {article?.created_at ? new Date(article.created_at).toLocaleDateString() : '—'}</p>
            </header>
            <div className="max-w-none space-y-6 text-slate-700">
                <p>{article?.content || 'Aucun contenu pour le moment. Ajoute du texte pour voir un aperçu.'}</p>
            </div>
        </article>
    );
}

export default ArticleView;
