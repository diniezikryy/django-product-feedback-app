from rest_framework import serializers

from .function import attempt_json_deserialize

from .models import Feedback, Comment

from users.serializers import UserSerializer

       
class FeedbackSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
       model = Feedback
       fields = ['id', 'title', 'category', 'upvotes', 'status', 'description','user']

    def create(self, validated_data):
        request = self.context['request']

        title = request.data.get("title")
        title = attempt_json_deserialize(title, expect_type=str)
        validated_data['title'] = title

        category = request.data.get("category")
        category = attempt_json_deserialize(category, expect_type=str)
        validated_data['category'] = category

        upvotes = request.data.get("upvotes")
        upvotes = attempt_json_deserialize(upvotes, expect_type=int)
        validated_data['upvotes'] = upvotes

        status = request.data.get("status")
        status = attempt_json_deserialize(status, expect_type=str)
        validated_data['status'] = status

        description = request.data.get("description")
        description = attempt_json_deserialize(description, expect_type=str)
        validated_data['description'] = description

        user_pk = request.data.get("user")
        user_pk = attempt_json_deserialize(user_pk, expect_type=int)
        validated_data['user_pk'] = user_pk

        instance = super().create(validated_data)

    def update(self, validated_data):
        request = self.context['request']

        title = request.data.get("title")
        title = attempt_json_deserialize(title, expect_type=str)
        validated_data['title'] = title

        category = request.data.get("category")
        category = attempt_json_deserialize(category, expect_type=str)
        validated_data['category'] = category

        upvotes = request.data.get("upvotes")
        upvotes = attempt_json_deserialize(upvotes, expect_type=int)
        validated_data['upvotes'] = upvotes

        status = request.data.get("status")
        status = attempt_json_deserialize(status, expect_type=str)
        validated_data['status'] = status

        description = request.data.get("description")
        description = attempt_json_deserialize(description, expect_type=str)
        validated_data['description'] = description

        user_pk = request.data.get("user")
        user_pk = attempt_json_deserialize(user_pk, expect_type=int)
        validated_data['user_pk'] = user_pk

        instance = super().update(instance, validated_data)
        

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    feedback = serializers.PrimaryKeyRelatedField(queryset=Feedback.objects.all()) # should only be id of the feedback

    class Meta:
        model = Comment
        fields = ['id', 'feedback', 'content', 'user']

class FeedbackDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'title', 'category', 'upvotes', 'status', 'description', 'comments','user']