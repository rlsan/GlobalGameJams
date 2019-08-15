from PIL import Image
from math import *
import os

###utility functions###

def factors_of(x):
	array = []

	for i in range(1, x + 1):
		if x % i == 0:
			array.append(str(i))
		  
	return array

def is_odd(x):
	return x%2==0

def is_square(x):
  y = x // 2
  seen = set([y])
  while y * y != x:
    y = (y + (x // y)) // 2
    if y in seen: return False
    seen.add(y)
  return True 

######

frame_prefix = 'phil'
frame_names = []
columns = 0
rows = 0

path = '/files/site/games/tex/assets'

for i in os.listdir(path):
	if frame_prefix in i:
		frame_names.append(i)

img = Image.open(frame_names[0])
no_of_frames = len(frame_names)

if is_square(no_of_frames):
	columns = int(sqrt(no_of_frames))
	rows = int(sqrt(no_of_frames))

else:
	factors = factors_of(no_of_frames)
	no_of_factors = len(factors)

	columns = int(factors[no_of_factors/2])
	rows = int(factors[no_of_factors/2-1])

width = img.size[0] * columns
height = img.size[1] * rows

output = Image.new("RGBA", (width,height), (0,0,0,0))

x=0
y=0
for i in range(0,no_of_frames):
	img = Image.open(frame_names[i])
	output.paste(img,(x*img.size[0],y*img.size[1]),img)
	x+=1
	if x >= columns:
		y+=1
		x=0

output.save('player.png')

print 'done'