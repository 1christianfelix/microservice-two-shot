from django.urls import path
from .views import ShoesList

urlpatterns = [
    path("shoes/", ShoesList, name="ShoeList"),
]
