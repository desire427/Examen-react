from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User

class ArticleSerializer(serializers.ModelSerializer):
    # Ajout d'un champ en lecture seule pour afficher le nom d'utilisateur de l'auteur
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'author', 'author_username', 'is_public', 'created_at', 'updated_at', 'status']
        # 'author' sera défini automatiquement par la vue lors de la création
        read_only_fields = ['author', 'created_at', 'updated_at']