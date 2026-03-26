from rest_framework import viewsets, permissions
from .models import Article
from .serializers import ArticleSerializer
from django.db.models import Q

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-created_at') # Ordonner par date de création décroissante
    serializer_class = ArticleSerializer
    # Permet la lecture pour tous, mais l'écriture uniquement pour les utilisateurs authentifiés
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Lors de la création d'un article, l'auteur est automatiquement l'utilisateur connecté
        serializer.save(author=self.request.user)

    def get_queryset(self):
        if self.request.user.is_authenticated:
            user = self.request.user
            # On récupère les IDs des amis de manière plus stable
            from friends.models import Friendship
            friendships = Friendship.objects.filter(Q(user1=user) | Q(user2=user)).values_list('user1_id', 'user2_id')
            
            # On extrait l'ID de l'autre personne dans chaque amitié
            friend_ids = set()
            for u1, u2 in friendships:
                friend_ids.add(u1 if u1 != user.id else u2)

            return Article.objects.filter(
                Q(author=user) | Q(author_id__in=friend_ids, is_public=True, status='published')
            ).distinct().order_by('-created_at')

        # Sinon, il ne voit que les articles publics et publiés
        return Article.objects.filter(is_public=True, status='published').order_by('-created_at')
