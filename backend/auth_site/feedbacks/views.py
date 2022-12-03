from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Feedback, Comment
from .serializers import FeedbackSerializer, CommentSerializer, FeedbackDetailSerializer

class FeedbackViewSet(ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Feedback.objects.all()
    
    def get_serializer_class(self):
        if self.action in ("create", "update", "partial_update"):
            return FeedbackSerializer
        return FeedbackDetailSerializer

class CommentViewSet(ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    


