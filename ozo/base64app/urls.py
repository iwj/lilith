# !/usr/bin/env python
# -*- coding: utf-8 -*-
# Date  : 2018-03-12
# Author: juzi
# E-mail: jentlewoo@gmail.com

from django.urls import path

from . import views

urlpatterns = [
        #例子：/base64app/
        path('', views.index, name='index'),
        #例子：/base64app/5/
        path('<int:question_id>/', views.detail, name='detail'),
        #例子：/base64app/5/results/
        path('<int:question_id>/results/', views.results, name='results'),
        #例子：/base64app/5/vote/
        path('<int:question_id>/vote/', views.vote, name='vote'),
        
        ]
