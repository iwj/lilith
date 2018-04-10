# !/usr/bin/env python
# -*- coding: utf-8 -*-
# Date  : 2018-03-24
# Author: juzi
# E-mail: jentlewoo@gmail.com


from django.urls import path

from . import views

app_name = 'card'
urlpatterns = [
    path('', views.index, name='index'),
    path('inputpage/', views.inputpage, name='inputpage'),
    path('make/', views.make, name='make'),
    ]
