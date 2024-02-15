from readability import Readability
import os

with os.scandir("./docs") as entries:
    for entry in entries:
        with open(entry.path, encoding = 'utf-8') as f:
            file = f.read()
            test = Readability(file)
            print(f'{entry.name}: {test.flesch()}')
