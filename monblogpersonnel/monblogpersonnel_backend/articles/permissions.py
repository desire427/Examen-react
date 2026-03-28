from rest_framework import permissions
from django.db.models import Q

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Seul l'auteur peut modifier/supprimer.
    Les amis peuvent lire uniquement si l'article est publié.
    """

    def has_object_permission(self, request, view, obj):
        # 1. L'auteur a tous les droits
        if obj.author == request.user:
            return True

        # 2. Pour les autres, on vérifie la lecture seule (GET)
        if request.method in permissions.SAFE_METHODS:
            # On vérifie si l'utilisateur est ami avec l'auteur
            from friends.models import Friendship
            is_friend = Friendship.objects.filter(
                (Q(user1=request.user) & Q(user2=obj.author)) |
                (Q(user1=obj.author) & Q(user2=request.user))
            ).exists()

            # Accès permis si ami ET article publié
            return is_friend and obj.status == 'published'

        # 3. Refus catégorique de modification si on n'est pas l'auteur
        return False