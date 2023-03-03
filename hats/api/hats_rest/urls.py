from django.urls import path

from .views import HatList

urlpatterns = [
    path("hats/", HatList, name="HatList"),
]
