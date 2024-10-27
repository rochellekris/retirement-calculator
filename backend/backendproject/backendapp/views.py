# from django.shortcuts import render

# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json

# from .models import DataStore

# @csrf_exempt
# def store_data(request):
#     if request.method == "POST":
#         try:
#             # Parse JSON data from the request body
#             data = json.loads(request.body)
            
#             # Save to database (using the model) or in memory
#             new_entry = DataStore(data=data)
#             new_entry.save()
            
#             return JsonResponse({"message": "Data stored successfully"}, status=201)
        
#         except json.JSONDecodeError:
#             return JsonResponse({"error": "Invalid JSON data"}, status=400)
#     return JsonResponse({"error": "Only POST requests are allowed"}, status=405)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User
from .serializers import UserSerializer

@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
