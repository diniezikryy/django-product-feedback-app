from rest_framework.viewsets import ModelViewSet
from .models import Feedback, Comment
from .serializers import FeedbackSerializer, CommentSerializer, FeedbackDetailSerializer

class FeedbackViewSet(ModelViewSet):
    queryset = Feedback.objects.all()
    
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return FeedbackSerializer
        return FeedbackDetailSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    


