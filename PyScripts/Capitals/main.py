import wikipedia
import re


def importData(file):
    capitals = []
    file = open(file)
    for line in file:
        line = line[:-1]
        capitals.append(line)
    file.close()
    return capitals


def saveData(file, capital, summary):
    file = open(file, "a", encoding="utf-8")
    file.write(capital)
    file.write("\t")
    file.write(summary)
    file.write("\n")
    file.write("\n")

def removeTranslations(str):
    ret = ''
    skip1c = 0
    skip2c = 0
    for i in str:
        if i == '[':
            skip1c += 1
        elif i == '(':
            skip2c += 1
        elif i == ']' and skip1c > 0:
            skip1c -= 1
        elif i == ')'and skip2c > 0:
            skip2c -= 1
        elif skip1c == 0 and skip2c == 0:
            ret += i
    return ret

if __name__ == "__main__":
    data = 'C:/Users/Konra/Desktop/listOfCapitals.txt'
    dest = 'c:/Users/Konra/Desktop/BD.txt'
    capitals = importData(data)
    i = 0
    for capital in capitals:
        print(capital)
        sum = removeTranslations(wikipedia.summary(capital + ' capital'))
        saveData(dest, capital, sum)
