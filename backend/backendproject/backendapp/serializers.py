from rest_framework import serializers

from .models import User, Account


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'age']
        

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['name', 'initial_balance', 'contribution_frequency', 'n', 'contribution_amount']