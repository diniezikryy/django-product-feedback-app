from rest_framework import serializers

from .function import attempt_json_deserialize

from .models import Feedback, Comment

from users.serializers import UserSerializer

       
class FeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comments = CommentSerializer(read_only=True)

    class Meta:
       model = Feedback
       fields = ['id', 'title', 'category', 'upvotes', 'status', 'description','user', 'comments']

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    feedback = FeedbackSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'feedback', 'content', 'user'] 