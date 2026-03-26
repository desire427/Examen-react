from rest_framework import serializers
from .models import FriendRequest, Friendship
from accounts.serializers import UserSerializer # Importez le UserSerializer que nous venons de créer

class FriendRequestSerializer(serializers.ModelSerializer):
    from_user = UserSerializer(read_only=True) # Affiche les détails de l'utilisateur qui envoie la demande
    to_user = UserSerializer(read_only=True)   # Affiche les détails de l'utilisateur qui reçoit la demande

    class Meta:
        model = FriendRequest
        fields = ['id', 'from_user', 'to_user', 'status', 'created_at']
        read_only_fields = ['from_user', 'status', 'created_at'] # from_user et status sont définis par le backend

class FriendshipSerializer(serializers.ModelSerializer):
    user1 = UserSerializer(read_only=True)
    user2 = UserSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ['id', 'user1', 'user2', 'created_at']