from django.db import models


class BinVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()




class Shoe(models.Model):
    color = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
