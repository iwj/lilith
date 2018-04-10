from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from . import pilscript

# Create your views here.

def index(request):
    return render(request, 'card/index.html')


    # latest_question_list = Question.objects.order_by('-pub_date')[:5]
    # template = loader.get_template('polls/index.html')
    # context = {
    #     'latest_question_list': latest_question_list,
    # }
    # return HttpResponse(template.render(context, request))

def inputpage(request):
    return render(request, 'card/inputpage.html')

def make(request):
    ret = pilscript.add_text()
    username = request.POST['username']
    return render(request, 'card/make.html', {'username': username,'ret': ret})
