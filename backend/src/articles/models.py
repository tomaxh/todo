from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200)
    due_date = models.DateField(editable=True)
    in_progress = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title 