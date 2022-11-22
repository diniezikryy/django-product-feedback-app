from django.urls import path
from .views import FeedbackViewSet

urlpatterns = [
    path('feedbacks', FeedbackViewSet),
]