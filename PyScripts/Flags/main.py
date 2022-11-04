import json
import wget

if __name__ == '__main__':
    file = open("C:/Users/Konra/Desktop/flags.json")
    data = json.load(file)
    j = 0
    for i in data['data']:
        try:
            url = i['flag']
            print(url)
            wget.download(url)
        except:
            print(i['name'], 'err')


