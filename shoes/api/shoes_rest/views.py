from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from django.shortcuts import render
from .models import BinVO, Shoes


class BinVOListEncoder(ModelEncoder):
    model = BinVO
    properties = ['closet_name']

class ShoeListEncoder(ModelEncoder):
    model = Shoes
    properties = ['color']

#

# @require_http_methods(["GET", "POST", "DELETE"])
# def api_list_location(request, bin_vo_id=None):
# # GET

# #


@require_http_methods(["GET", "POST"])
def ShoesList(request):
    if request.method == "GET":
        shoes = Shoes.objects.all()
        return JsonResponse(
            {shoes: shoes}, encoder=ShoeListEncoder)
    return JsonResponse(
        {shoes: shoes}, encoder=ShoeListEncoder)
