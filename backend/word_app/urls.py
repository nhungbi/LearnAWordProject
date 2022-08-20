
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index),
    path('signup/', views.signup),
    path('login', views.log_in),
    path('logout', views.log_out),
    path('whoami', views.who_am_i),
    path('get_word', views.get_word),
    path('save_word', views.save_word),
    path('get_leaderboard', views.get_leaderboard),
    path('get_user_history', views.get_user_history),
    path('get_word_db/<str:word>', views.get_word_db)

]
