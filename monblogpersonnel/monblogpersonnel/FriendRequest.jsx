// src/components/Friends/FriendRequest.jsx
import React from 'react';

function FriendRequest({ request }) {
    // Display friend request and accept/reject buttons
    return (
        <div>
            {request?.username || "No Username"} wants to be your friend.
            <button>Accept</button>
            <button>Reject</button>
        </div>
    );
}

export default FriendRequest;