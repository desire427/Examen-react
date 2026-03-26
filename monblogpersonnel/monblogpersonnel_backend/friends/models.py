from django.db import models
from django.contrib.auth.models import User

class FriendRequest(models.Model):
    from_user = models.ForeignKey(User, related_name='sent_friend_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(User, related_name='received_friend_requests', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='pending') # 'pending', 'accepted', 'rejected'
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('from_user', 'to_user') # Une seule demande par paire d'utilisateurs

    def __str__(self):
        return f"{self.from_user.username} to {self.to_user.username} ({self.status})"

class Friendship(models.Model):
    user1 = models.ForeignKey(User, related_name='friendships_as_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='friendships_as_user2', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user1', 'user2') # Une seule amitié par paire d'utilisateurs

    def __str__(self):
        return f"{self.user1.username} and {self.user2.username}"