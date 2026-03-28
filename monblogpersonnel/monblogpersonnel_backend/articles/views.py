from rest_framework import viewsets, permissions
from .models import Article
from .serializers import ArticleSerializer
from django.db.models import Q
from .permissions import IsOwnerOrReadOnly # Importez votre nouvelle permission
from friends.models import Friendship, Block

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at') # Ordonner par date de création décroissante
    serializer_class = ArticleSerializer
    # Permet la lecture pour tous, mais l'écriture uniquement pour les utilisateurs authentifiés
    permission_classes = [IsOwnerOrReadOnly] # Utilisez votre permission personnalisée

    def perform_create(self, serializer):
        # Lors de la création d'un article, l'auteur est automatiquement l'utilisateur connecté
        serializer.save(author=self.request.user)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            
            # 1. Identifier les personnes bloquées (ceux que j'ai bloqués ET ceux qui m'ont bloqué)
            blocked_by_me = Block.objects.filter(blocker=user).values_list('blocked_id', flat=True)
            blocked_me = Block.objects.filter(blocked=user).values_list('blocker_id', flat=True)
            all_blocked_ids = set(blocked_by_me) | set(blocked_me)

            # 2. Récupérer les IDs des amis
            friendships = Friendship.objects.filter(Q(user1=user) | Q(user2=user)).values_list('user1_id', 'user2_id')
            
            friend_ids = set()
            for u1, u2 in friendships:
                other_id = u1 if u1 != user.id else u2
                if other_id not in all_blocked_ids:
                    friend_ids.add(other_id)

            return Article.objects.filter(
                Q(author=user) | Q(author_id__in=friend_ids, status='published')
            ).exclude(author_id__in=all_blocked_ids).distinct().order_by('-created_at')

        # Si non connecté : accès refusé (liste vide) pour respecter votre consigne
        return Article.objects.none()
