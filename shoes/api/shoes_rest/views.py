from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from django.shortcuts import render
from .models import BinVO, Shoe


class BinVOListEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
    ]


class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "manufacturer",

    ]


class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "pictureURL",
        "color",
        "bin",
    ]

    encoders = {
        "bin": BinVOListEncoder(),
    }
    #


@require_http_methods(["GET", "POST"])
def api_list_Shoes(request, bin_vo_id=None):
    # GET
    print("___", bin_vo_id)
    print(BinVO.objects.all())

    if request.method == "GET":
        shoes = Shoe.objects.filter(bin=bin_vo_id)
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "invalid location id"},
                status=400,
            )

        shoes = Shoe.objects.create(**content)
        print("___", shoes)
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

# POST


@require_http_methods(['GET', 'DELETE'])
def api_show_shoe(request, id):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=id)
        return JsonResponse(
            shoe, encoder=ShoeDetailEncoder, safe=False
        )
    else:
        count, _ = Shoe.objects.filter(id=id).delete()
        return JsonResponse({'deleted': count > 0})


@require_http_methods(["GET", "POST"])
def ShoeList(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {shoes: shoes}, encoder=ShoeListEncoder)
    return JsonResponse(
        {shoes: shoes}, encoder=ShoeListEncoder)
