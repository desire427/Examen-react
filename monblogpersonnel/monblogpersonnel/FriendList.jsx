// src/components/Dashboard/FriendList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FriendRequestItem from './FriendRequestItem';
import FriendSearch from './FriendSearch';

function FriendList() {
    const [friends, setFriends] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFriendsAndRequests = async () => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                setError('Vous devez être connecté pour voir vos amis.');
                setLoading(false);
                return;
            }

            // Récupérer la liste d'amis
            const friendsResponse = await axios.get('http://127.0.0.1:8000/api/friends/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setFriends(friendsResponse.data);

            // Récupérer les demandes d'amis (reçues et envoyées)
            const requestsResponse = await axios.get('http://127.0.0.1:8000/api/friend-requests/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const storedUser = localStorage.getItem('user');
            const currentUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

            // Filtrer pour n'afficher que les demandes en attente reçues
            const receivedPendingRequests = requestsResponse.data.filter(
                req => req.status === 'pending' && currentUser && req.to_user.id === currentUser.id
            );
            setFriendRequests(receivedPendingRequests);

            setLoading(false);
        } catch (err) {
            console.error("Erreur lors de la récupération des amis/demandes:", err.response ? err.response.data : err.message);
            setError("Impossible de charger la liste d'amis ou les demandes.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFriendsAndRequests();
    }, []);

    const handleRemoveFriend = async (friendId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.post(`http://127.0.0.1:8000/api/friends/${friendId}/remove/`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('Ami supprimé.');
            fetchFriendsAndRequests(); // Rafraîchir la liste
        } catch (err) {
            console.error("Erreur lors de la suppression de l'ami:", err.response ? err.response.data : err.message);
            alert('Échec de la suppression de l\'ami: ' + (err.response?.data?.detail || err.message));
        }
    };

    if (loading) return <div className="p-4 text-slate-600">Chargement des amis...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Amis</h3>
                <span className="text-sm text-slate-500">{friends.length} contacts</span>
            </div>

            <ul className="space-y-3">
                {friends.map((friend) => (
                    <li
                        key={friend.id}
                        className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div>
                            <p className="text-base font-semibold text-slate-900">
                                {friend.username}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => handleRemoveFriend(friend.id)} className="btn btn-secondary text-xs">
                                Supprimer
                            </button>
                            {/* <button className="btn btn-secondary text-xs">Bloquer</button> */}
                        </div>
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-semibold text-slate-900 mt-8">Demandes d'amis reçues</h3>
            {friendRequests.length > 0 ? (
                <ul className="space-y-3">
                    {friendRequests.map(request => (
                        <FriendRequestItem key={request.id} request={request} onUpdate={fetchFriendsAndRequests} />
                    ))}
                </ul>
            ) : (
                <p className="text-slate-500">Aucune demande d'ami en attente.</p>
            )}

            <h3 className="text-lg font-semibold text-slate-900 mt-8">Rechercher des amis</h3>
            <FriendSearch onFriendRequestSent={fetchFriendsAndRequests} />
        </div>
    );
}

export default FriendList;
