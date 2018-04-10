# !/usr/bin/env python
# -*- coding: utf-8 -*-
# Date  : 2017-09-10
# Author: juzi
# E-mail: jentlewoo@gmail.com

from __future__ import print_function
import os, sys
from PIL import Image, ImageDraw, ImageFont

from io import BytesIO

from django.http import HttpResponse

import base64

#font_name = 'STHeiti Medium.ttc'
#font_name = 'Zapfino.ttf'
#font_name = 'STHeiti Light.ttc'

def add_text(username='Your Name'):
    font_name = 'Monaco'
    image = Image.new('RGBA', (550, 715), (0,)*4)
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype(font_name, 18)
    text = username
    x, y = (300, 605)
    color = (205, 205, 205)
    draw.text((x,y), text, color, font=font)

    # bg = Image.open(sys.argv[1])
    bg = Image.open(r'/Users/orange/Documents/yourcard/card_base_201712.jpg')

    image = image.rotate(0, expand=0)
    image = Image.composite(image, bg, image)
    # image.save('result_review.jpg')
    # image.show()

    # test file io
    byte_file = BytesIO()
    image.save(byte_file, format='PNG')
    # image_data = byte_file.getvalue()
    # return image_data

    '''
    second way
    '''
    # return HttpResponse(image_data,content_type="image/png")

    '''
    stackoverflow way
    '''
    image_data = "data:image/png;base64,{}".format(base64.b64encode(byte_file.getvalue()))
    # return image_data


    '''
    blogcn way
    '''
    with open("/Users/orange/Documents/yourcard/card_base_201712.jpg","rb") as f:
        # b64encode是编码，b64decode是解码
        base64_data = base64.b64encode(f.read())
        image_data = "data:image/jpg;base64,{}".format(f.read())

        # base64.b64decode(base64data)
        # return base64_data
        return image_data
