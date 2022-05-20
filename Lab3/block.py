# Made by Krzysztof Kołodziejski

from PIL import Image
import hashlib

input_image = Image.open("plain.bmp")

image_data = input_image.tobytes()
size = input_image.size

# ECB
new_data = []
keys = []
block = 8

for x in range(block):
    key = hashlib.sha1(str(x ** 15 + x).encode("UTF-8")).digest()
    keys.append(key)

for x in range(size[0]):
    for y in range(size[1]):
        position = x * size[1] + y
        old_pixel = image_data[position]
        new_pixel = old_pixel ^ keys[x % block][y % block]
        new_data.append(new_pixel)

output_ecb = input_image.copy()
output_ecb.frombytes(bytes(new_data))
output_ecb.save("ecb_crypto.bmp")

print("Wygenerowano ecb")

# CBC
new_key = 13
new_data = [image_data[0] ^ new_key]
for x in range(size[0]*size[1]):
    new_data.append(new_data[x - 1] ^ image_data[x] ^ keys[x % 64//8][x % 8])

output_cbc = input_image.copy()
output_cbc.frombytes(bytes(new_data))
output_cbc.save("cbc_crypto.bmp")

print("Wygenerowano cbc")
