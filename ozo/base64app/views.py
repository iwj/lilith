from django.shortcuts import render
from django.http import HttpResponse
from .models import Question

# Create your views here.

def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'base64app/index.html', context)

def detail(request, question_id):
    return HttpResponse("你正在查看问题：%s" % question_id)

def results(request, question_id):
    reponse = "你正在查看问题‘%s’的答案"
    return HttpResponse(reponse % question_id)

def vote(request, question_id):
    return HttpResponse("你正在选择问题‘%s’的答案" % question_id)
