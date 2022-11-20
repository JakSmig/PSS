import json


if __name__ == '__main__':
    with open('capdata.json', 'r') as capJson:
        with open('coords.json', 'r', encoding="utf-8-sig") as coordJson:
            with open('currencies.json', 'r', encoding="utf-8-sig") as currJson:    

                capFile = json.load(capJson)
                coordsFile = json.load(coordJson)
                currFile = json.load(currJson)

                newCapList = []

                for capital in capFile:
                    capname = capital['capital']
                    countryname = capital['country']
                    capdesc = capital['description']
                    capcoords = ''
                    capcurr = ''
                    for coord in coordsFile:
                        if coord['Capital Name'] == countryname or coord['Country Name'] == capname:
                            capcoords = '(' + str(coord['Capital Latitude']) +', '+ str(coord['Capital Longitude']) +')'

                    for curr in currFile:
                        if curr['name'] == capname:
                            capcurr = curr['currency']

                    newCapList.append({'capital': countryname, 'country':capname, 'description':capdesc, 'coordinates':capcoords, 'currency':capcurr})

                with open("fullcapdata.json", "w") as outfile:
                    outfile.write(json.dumps(newCapList, indent=4))
        

