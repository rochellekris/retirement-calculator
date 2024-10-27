from django.db import models


class User(models.Model):
    username = models.CharField(max_length=100)
    age = models.IntegerField()


class Account(models.Model):
    name = models.CharField(max_length=100)
    initial_balance = models.FloatField()
    contribution_frequency = models.CharField(max_length=100)
    n = models.IntegerField()
    contribution_amount = models.FloatField()
