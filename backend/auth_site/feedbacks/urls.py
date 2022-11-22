from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FeedbackViewSet, CommentViewSet

router = DefaultRouter()
router.register(r'feedbacks', FeedbackViewSet, basename="feedback")
router.register(r'comments', CommentViewSet, basename="comment")

urlpatterns = [
    path('', include(router.urls)),
]