import React, { useState, useEffect } from 'react';

function ArticleForm({ initialData = {}, onSubmit, isEditing = false }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [isPublic, setIsPublic] = useState(initialData.is_public || false);
    const [status, setStatus] = useState(initialData.status || 'draft');

    // Update form fields if initialData changes (e.g., when fetching article for edit)
    useEffect(() => {
        if (isEditing && initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setIsPublic(initialData.is_public || false);
            setStatus(initialData.status || 'draft');
        }
    }, [initialData, isEditing]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, content, is_public: isPublic, status });
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
                <label className="text-sm font-medium text-slate-700">Titre</label>
                <input
                    className="input mt-2"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Titre de votre article"
                    required
                />
            </div>
            <div>
                <label className="text-sm font-medium text-slate-700">Contenu</label>
                <textarea
                    className="input mt-2 h-48"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Écrivez votre article ici..."
                    required
                />
            </div>
            <div className="flex items-center gap-2">
                <input type="checkbox" id="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} className="checkbox" />
                <label htmlFor="isPublic" className="text-sm font-medium text-slate-700">Rendre public</label>
            </div>
            <div>
                <label htmlFor="status" className="text-sm font-medium text-slate-700">Statut</label>
                <select id="status" className="input mt-2" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="draft">Brouillon</option>
                    <option value="published">Publié</option>
                </select>
            </div>
            <button type="submit" className="btn btn-primary w-full">
                {isEditing ? "Mettre à jour l'article" : "Publier l'article"}
            </button>
        </form>
    );
}

export default ArticleForm;