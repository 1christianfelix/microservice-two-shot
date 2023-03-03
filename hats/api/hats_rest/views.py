from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder

from django.shortcuts import render
from .models import LocationVO, Hat

# Create your views here.


class LocationVOListEncoder(ModelEncoder):
    model = LocationVO
    properties = ['closet_name']

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ['color']

#################################################################


# @require_http_methods(["GET", "POST", "DELETE"])
# def api_list_locations(request, location_vo_id=None):
    # GET

    # DELETE

    # POST


@require_http_methods(["GET", "POST"])
def HatList(request):
    if request.method == "GET":
        hats = 'hello'
        return JsonResponse(
            {hats: hats}, encoder=HatListEncoder)
    return JsonResponse(
        {hats: hats}, encoder=HatListEncoder)
