// src/components/Articles/ArticleEdit.jsx
import React, { useState } from 'react';

function ArticleEdit({ article }) {
    const [title, setTitle] = useState(article?.title || '');
    const [content, setContent] = useState(article?.content || '');
    const [isPublic, setIsPublic] = useState(article?.isPublic || false);
    const [allowComments, setAllowComments] = useState(article?.allowComments || true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement edit article logic (API call)
        console.log("Article Edited")
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Article</h2>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Content:</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} />
            </div>
            <div>
                <label>Public:</label>
                <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            </div>
            <div>
                <label>Allow Comments:</label>
                <input type="checkbox" checked={allowComments} onChange={(e) => setAllowComments(e.target.checked)} />
            </div>
            <button type="submit">Update</button>
        </form>
    );
}

export default ArticleEdit;