from django.db import models
from django.urls import reverse

# Create your models here.


class LocationVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()


class Hat(models.Model):
    color = models.CharField(max_length=200)
    fabric = models.CharField(max_length=200, default='')
    style_name = models.CharField(max_length=200, default='')
    picture_url = models.URLField(null=True, default='')

    location = models.ForeignKey(
        LocationVO,
        related_name='hats',
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.style_name
    def get_api_url(self):
        return reverse('api_show_hat', kwargs={'id': self.id})
