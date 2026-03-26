import React, { useState } from 'react';
import axios from 'axios';

function FriendSearch({ onFriendRequestSent }) {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSearchResults([]);
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('Vous devez être connecté pour rechercher des amis.');
                setLoading(false);
                return;
            }
            const response = await axios.get(`http://127.0.0.1:8000/api/friends/search/?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setSearchResults(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Erreur lors de la recherche d'amis:", err.response ? err.response.data : err.message);
            setError("Impossible de rechercher des amis.");
            setLoading(false);
        }
    };

    const sendFriendRequest = async (toUserId) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            await axios.post('http://127.0.0.1:8000/api/friend-requests/', { to_user_id: toUserId }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            alert('Demande d\'ami envoyée !');
            setSearchResults(prev => prev.filter(user => user.id !== toUserId)); // Supprimer de la liste de résultats
            onFriendRequestSent(); // Notifier le parent pour rafraîchir les demandes
        } catch (err) {
            console.error("Erreur lors de l'envoi de la demande d'ami:", err.response ? err.response.data : err.message);
            alert('Échec de l\'envoi de la demande: ' + (err.response?.data?.detail || err.message));
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un utilisateur..."
                    className="input flex-grow"
                />
                <button type="submit" className="btn btn-secondary" disabled={loading}>
                    {loading ? 'Recherche...' : 'Rechercher'}
                </button>
            </form>
            {error && <p className="text-red-600">{error}</p>}
            {searchResults.length > 0 && (
                <ul className="space-y-2">
                    {searchResults.map(user => (
                        <li key={user.id} className="flex items-center justify-between p-2 border rounded-md">
                            <span>{user.username}</span>
                            <button onClick={() => sendFriendRequest(user.id)} className="btn btn-primary text-xs">
                                Ajouter
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {searchResults.length === 0 && query && !loading && !error && (
                <p className="text-center text-slate-500">Aucun utilisateur trouvé.</p>
            )}
        </div>
    );
}

export default FriendSearch;