from django.db import models
from django.contrib.auth.models import AbstractUser
import datetime
# Inheriting from 'AbstractUser' lets us use all the fields of the default User,
# and overwrite the fields we need to change
# This is different from 'AbstractBaseUser', which only gets the password management features from the default User,
# and needs the developer to define other relevant fields.
class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [] # Email & Password are required by default.

class Word(models.Model):
    user = models.ManyToManyField(AppUser, related_name= 'words')
    word = models.CharField(max_length = 225)
    definition = models.TextField()
    audio = models.TextField()
    pronounciation = models.TextField()
    part_of_speech = models.CharField(max_length=128)
    date_learned = models.DateField(default = datetime.date.today)

class Stem(models.Model):
    text = models.CharField(max_length=255)
    word = models.ForeignKey(Word, on_delete=models.CASCADE, related_name= 'stems')
