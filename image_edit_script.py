# !/usr/bin/env python
# -*- coding: utf-8 -*-
# Date  : 2017-09-10
# Author: juzi
# E-mail: jentlewoo@gmail.com

from __future__ import print_function
import os, sys
from PIL import Image, ImageDraw, ImageFont

from io import BytesIO

#font_name = 'STHeiti Medium.ttc'
#font_name = 'Zapfino.ttf'
#font_name = 'STHeiti Light.ttc'
font_name = 'Monaco'
image = Image.new('RGBA', (550, 715), (0,)*4)
draw = ImageDraw.Draw(image)
font = ImageFont.truetype(font_name, 18)
text = 'Jian Woo'
x, y = (290, 605)
color = (205, 205, 205)
draw.text((x,y), text, color, font=font)

# bg = Image.open(sys.argv[1])
bg = Image.open('card_base_201712.jpg')

image = image.rotate(0, expand=0)
image = Image.composite(image, bg, image)
image.save('result_review.jpg')
image.show()

# test file io

# source_file = open('card_base_201712.jpg', 'rb')
byte_file = BytesIO()
image.save(byte_file, format='PNG')
# print(byte_file.getvalue())
