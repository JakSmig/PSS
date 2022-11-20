import base64
import os
import json


def encode(image):
    with open(image, "rb") as img_file:
        my_string = base64.b64encode(img_file.read())
        my_string = my_string.decode('utf-8')
    return my_string


def decode(string, filename):
    imgdata = base64.b64decode(string)
    filename = filename
    with open(filename, 'wb') as f:
        f.write(imgdata)


if __name__ == '__main__':
    path = "C:/Users/Konra/Desktop/flags/"
    data = []
    for file in os.listdir(path):
        filename = file[8:]
        if "the_" in filename and "_the" not in filename:
            filename = filename[4:]
        filename = filename.replace('_', ' ')
        data.append({
            "Country": str(filename),
            "b64": encode("C:/Users/Konra/Desktop/flags/" + file)
        })
    with open('flags.json', 'w') as f:
        json.dump(data, f)