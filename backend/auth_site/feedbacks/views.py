from rest_framework.viewsets import ModelViewSet
from .models import Feedback, Comment
from .serializers import FeedbackSerializer, CommentSerializer

class FeedbackViewSet(ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


