// src/components/Friends/FriendItem.jsx
import React from 'react';

function FriendItem({ friend }) {
    return (
        <div>
            {friend?.username || "No Username"}
            <button>Remove</button>
            <button>Block</button>
        </div>
    );
}

export default FriendItem;