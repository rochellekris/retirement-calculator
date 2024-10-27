from django.urls import path
from .views import user_list

urlpatterns = [
    # path('store-data/', store_data, name='store_data'),
    path('users/', user_list, name='user_list')
]
