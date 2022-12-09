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

        user = self.context['request'].user
        validated_data['user'] = user

        instance = super().create(validated_data)

        return instance

    def update(self, instance, validated_data):
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

        user = self.context['request'].user
        validated_data['user'] = user

        instance = super().update(instance, validated_data)

        return instance
        
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    feedback = serializers.PrimaryKeyRelatedField(queryset=Feedback.objects.all()) # should only be id of the feedback

    class Meta:
        model = Comment
        fields = ['id', 'feedback', 'content', 'user']

    def create(self, validated_data):
        request = self.context['request']

        feedback = request.data.get("feedback")
        feedback = attempt_json_deserialize(feedback, expect_type=int)
        feedback = Feedback.objects.get(pk=feedback)
        validated_data['feedback'] = feedback

        content = request.data.get("content")
        content = attempt_json_deserialize(content, expect_type=str)
        validated_data['content'] = content

        user = self.context['request'].user
        validated_data['user'] = user

        instance = super().create(validated_data)

        return instance

    def update(self, instance, validated_data):
        """
        Comment ID must correctly relate to the feedback ID
        """
        request = self.context['request']
        
        feedback = request.data.get("feedback")
        feedback = attempt_json_deserialize(feedback, expect_type=int)
        feedback = Feedback.objects.get(pk=feedback)
        validated_data['feedback'] = feedback

        content = request.data.get("content")
        content = attempt_json_deserialize(content, expect_type=str)
        validated_data['content'] = content

        user = self.context['request'].user
        validated_data['user'] = user

        instance = super().update(instance, validated_data)

        return instance

    

class FeedbackDetailSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = Feedback
        fields = ['id', 'title', 'category', 'upvotes', 'status', 'description', 'comments','user']