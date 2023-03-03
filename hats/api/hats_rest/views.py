from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder

from django.shortcuts import render
from .models import LocationVO, Hat

# Create your views here.


class LocationVOListEncoder(ModelEncoder):
    model = LocationVO
    properties = ['closet_name', 'section_number', 'shelf_number', 'import_href']

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ['style_name']

class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "color",
        "fabric",
        "style_name",
        "picture_url",
        "location",
    ]

    encoders = {
        'location': LocationVOListEncoder(),
    }

#################################################################


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    print('--------', location_vo_id)
    print(LocationVO.objects.all())
    if request.method == "GET":
        # print('---------test')
        # print(LocationVO.objects.get(import_href=f"/api/locations/{location_vo_id}/"))
        # print(Hat.objects.all())

        # print('---------',LocationVO.objects.all())
        hats = Hat.objects.filter(location=location_vo_id)
        print('--------',hats)
        return JsonResponse(
            {'hats': hats}, encoder=HatListEncoder, safe=False
            )
    else:
        content = json.loads(request.body)
        # print(LocationVO.objects.all())
        # print('--------', f"/api/locations/{location_vo_id}")
        # test = LocationVO.objects.get(import_href=f"/api/locations/{location_vo_id}/")
        # print('objk-----', test)
        # print(test)
        # print(Hat.objects.all())
        try:

            location_href = f"/api/locations/{location_vo_id}/"
            print(location_href)
            location = LocationVO.objects.get(import_href=location_href)
            content['location'] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {'message': 'Invalid location id'},
                status=400
            )
        hats = Hat.objects.create(**content)
        print('___', hats)
        return JsonResponse(
            hats, encoder=HatDetailEncoder, safe=False
        )



@require_http_methods(['GET', 'DELETE'])
def api_show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat, encoder=HatDetailEncoder, safe=False
        )
    else:
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})




@require_http_methods(["GET", "POST"])
def HatList(request):
    if request.method == "GET":
        hats = 'hello'
        return JsonResponse(
            {hats: hats}, encoder=HatListEncoder)
    return JsonResponse(
        {hats: hats}, encoder=HatListEncoder)
