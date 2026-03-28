// src/components/Articles/ArticleCreate.jsx
import React, { useState } from 'react';

function ArticleCreate() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [allowComments, setAllowComments] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Article Created");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Article</h2>
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
            <button type="submit">Create</button>
        </form>
    );
}

export default ArticleCreate;