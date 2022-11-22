from django.db import models
from django.core.validators import MinValueValidator

from users.models import UserAccount



class Feedback(models.Model):
    title = models.CharField(max_length=100)
    category = models.CharField(default='enhancement', max_length=100)
    upvotes = models.IntegerField(validators=[MinValueValidator(0)])
    status = models.CharField(default='suggestion', max_length=100)
    description = models.CharField(blank=True, max_length=255)
    user = models.ForeignKey(UserAccount, null=True, on_delete=models.SET_NULL, related_name="feedbacks")

class Comment(models.Model):
    feedback = models.ForeignKey(Feedback, null=True,on_delete=models.SET_NULL, related_name="comments")
    user = models.ForeignKey(UserAccount, null=True,on_delete=models.CASCADE)
    content =  models.CharField(blank=False, max_length=255)


