# !/usr/bin/env python
# -*- coding: utf-8 -*-
# Date  : 2018-03-16
# Author: juzi
# E-mail: jentlewoo@gmail.com

from django.urls import path

from . import views


app_name = 'polls'

urlpatterns = [
    path('',views.IndexView.as_view(), name='index'),
    path('<int:pk>/', views.DetailView.as_view(), name='detail'),
    path('<int:pk>/results/', views.ResultsView.as_view(), name='results'),
    path('<int:question_id>/vote/', views.vote, name='vote'),
]
