from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db.models import Q
from .models import FriendRequest, Friendship, Block
from .serializers import FriendRequestSerializer, FriendshipSerializer
from accounts.serializers import UserSerializer

class FriendRequestViewSet(viewsets.ModelViewSet):
    queryset = FriendRequest.objects.all()
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Un utilisateur ne peut voir que les demandes qu'il a envoyées ou reçues
        return FriendRequest.objects.filter(Q(from_user=self.request.user) | Q(to_user=self.request.user)).order_by('-created_at')

    def perform_create(self, serializer):
        to_user_id = self.request.data.get('to_user_id')
        if not to_user_id:
            raise serializers.ValidationError("L'ID de l'utilisateur destinataire est requis.")

        try:
            to_user = User.objects.get(id=to_user_id)
        except User.DoesNotExist:
            raise serializers.ValidationError("L'utilisateur destinataire n'existe pas.")

        if self.request.user == to_user:
            raise serializers.ValidationError("Vous ne pouvez pas vous envoyer une demande d'ami.")

        # Vérifier si une demande existe déjà ou s'ils sont déjà amis
        if FriendRequest.objects.filter(from_user=self.request.user, to_user=to_user, status='pending').exists() or \
           FriendRequest.objects.filter(from_user=to_user, to_user=self.request.user, status='pending').exists() or \
           Friendship.objects.filter(Q(user1=self.request.user, user2=to_user) | Q(user1=to_user, user2=self.request.user)).exists():
            raise serializers.ValidationError("Une demande d'ami est déjà en attente ou vous êtes déjà amis.")

        serializer.save(from_user=self.request.user, to_user=to_user)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        friend_request = self.get_object()
        if friend_request.to_user != request.user:
            return Response({'detail': 'Non autorisé à accepter cette demande.'}, status=status.HTTP_403_FORBIDDEN)

        if friend_request.status != 'pending':
            return Response({'detail': 'La demande d\'ami n\'est pas en attente.'}, status=status.HTTP_400_BAD_REQUEST)

        friend_request.status = 'accepted'
        friend_request.save()

        # Créer l'amitié dans les deux sens pour simplifier les requêtes
        Friendship.objects.create(user1=friend_request.from_user, user2=friend_request.to_user)
        Friendship.objects.create(user1=friend_request.to_user, user2=friend_request.from_user) # Ajout pour faciliter la recherche
        return Response({'detail': 'Demande d\'ami acceptée.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        friend_request = self.get_object()
        if friend_request.to_user != request.user:
            return Response({'detail': 'Non autorisé à rejeter cette demande.'}, status=status.HTTP_403_FORBIDDEN)

        if friend_request.status != 'pending':
            return Response({'detail': 'La demande d\'ami n\'est pas en attente.'}, status=status.HTTP_400_BAD_REQUEST)

        friend_request.status = 'rejected'
        friend_request.save()
        return Response({'detail': 'Demande d\'ami rejetée.'}, status=status.HTTP_200_OK)

class FriendListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        # Pour l'action de liste par défaut, on ne retourne que les amis.
        # Pour les autres actions (block, unblock), on permet l'accès à tous les utilisateurs.
        if self.action != 'list':
            return User.objects.all()
            
        friends_ids = Friendship.objects.filter(Q(user1=user) | Q(user2=user)).values_list('user1__id', 'user2__id')
        friends_ids = [id for pair in friends_ids for id in pair if id != user.id]
        return User.objects.filter(id__in=friends_ids).order_by('username')

    @action(detail=True, methods=['post'])
    def remove(self, request, pk=None):
        friend_to_remove = self.get_object()
        user = request.user

        # Supprime l'amitié dans les deux sens
        Friendship.objects.filter(Q(user1=user, user2=friend_to_remove) | Q(user1=friend_to_remove, user2=user)).delete()
        FriendRequest.objects.filter(Q(from_user=user, to_user=friend_to_remove) | Q(from_user=friend_to_remove, to_user=user)).delete() # Supprime aussi les requêtes passées
        return Response({'detail': 'Ami supprimé.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def block(self, request, pk=None):
        user_to_block = self.get_object()
        user = request.user

        # 1. Créer le blocage permanent
        Block.objects.get_or_create(blocker=user, blocked=user_to_block)

        # 2. Supprime l'amitié et les requêtes existantes
        Friendship.objects.filter(Q(user1=user, user2=user_to_block) | Q(user1=user_to_block, user2=user)).delete()
        FriendRequest.objects.filter(Q(from_user=user, to_user=user_to_block) | Q(from_user=user_to_block, to_user=user)).delete()
        return Response({'detail': 'Utilisateur bloqué.'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def unblock(self, request, pk=None):
        user_to_unblock = self.get_object()
        user = request.user
        Block.objects.filter(blocker=user, blocked=user_to_unblock).delete()
        return Response({'detail': 'Utilisateur débloqué.'}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['get'])
    def blocked_list(self, request):
        user = request.user
        blocked_ids = Block.objects.filter(blocker=user).values_list('blocked_id', flat=True)
        blocked_users = User.objects.filter(id__in=blocked_ids).order_by('username')
        serializer = self.get_serializer(blocked_users, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({'detail': 'Veuillez fournir un terme de recherche.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Exclure l'utilisateur actuel et les amis existants
        user = request.user
        friends_ids = Friendship.objects.filter(Q(user1=user) | Q(user2=user)).values_list('user1__id', 'user2__id')
        friends_ids = [id for pair in friends_ids for id in pair] # Inclut l'utilisateur lui-même pour l'exclusion

        users = User.objects.filter(username__icontains=query).exclude(id__in=friends_ids).exclude(id=user.id)
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)