import React from 'react';
import axios from 'axios';

function FriendRequestItem({ request, onUpdate }) {
    const handleAction = async (action) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                alert('Vous devez être connecté.');
                return;
            }
            await axios.post(`http://127.0.0.1:8000/api/friend-requests/${request.id}/${action}/`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            onUpdate(); // Notifier le parent pour rafraîchir la liste
        } catch (error) {
            console.error(`Erreur lors de l'${action} de la demande d'ami:`, error.response ? error.response.data : error.message);
            alert(`Échec de l'${action} de la demande: ` + (error.response?.data?.detail || error.message));
        }
    };

    return (
        <li className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-base font-semibold text-slate-900">
                    Demande de : {request.from_user.username}
                </p>
                <p className="text-sm text-slate-600">Statut : {request.status}</p>
            </div>
            {request.status === 'pending' && (
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => handleAction('accept')}
                        className="btn btn-primary text-xs"
                    >
                        Accepter
                    </button>
                    <button
                        onClick={() => handleAction('reject')}
                        className="btn btn-secondary text-xs"
                    >
                        Rejeter
                    </button>
                </div>
            )}
        </li>
    );
}

export default FriendRequestItem;