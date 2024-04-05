import pandas as pd
import matplotlib.pyplot as plt
import glob
import sys
import json
from pathlib import Path

FIGURES_FOLDER = "./Figures/"

_, iterations, operation, query = sys.argv

filenames = glob.glob(f"./Results/*/{operation}/*-{operation}-{query}-{iterations}.json")

libs = {}

if len(filenames) != 3: 
  raise Exception(f"Data files insufficient for operation {operation}") 

for file in filenames:
  with open(file) as infile:
    filename = Path(file).stem.split("-")[0]
    libs[filename] = json.load(infile)
  
def createMemoryUsageFigure():
  df = pd.DataFrame({"MikroORM": libs["MikroORM"]["memoryUsage"], "Prisma": libs["Prisma"]["memoryUsage"], "Sequelize": libs["Sequelize"]["memoryUsage"]})

# Create box plot and save it
  plt.figure(figsize=(8, 6))
  df.boxplot(color={"boxes": "tomato"}, patch_artist=True, showfliers=False)
  plt.ylabel('Memory Usage (mb)')
  plt.title('Box plot of Memory Usage')
  plt.grid(True)
  plt.savefig(FIGURES_FOLDER + f"{operation}-{query}-{iterations}-memoryUsage")

  print ("Mean values:")
  print (df.mean())
  print ("STD values:")
  print (df.std())
  print ("S.E values:")
  print (df.sem())

def createResponseTimeFigure():
  df = pd.DataFrame({"MikroORM": libs["MikroORM"]["responseTimes"], "Prisma": libs["Prisma"]["responseTimes"], "Sequelize": libs["Sequelize"]["responseTimes"]})

  # Create box plot and save it
  plt.figure(figsize=(8, 6))
  df.boxplot(color={"boxes": "tomato"}, patch_artist=True, showfliers=False)
  plt.ylabel('Reponse Time (ms)')
  plt.title('Box plot of Response Time')
  plt.grid(True)
  plt.savefig(FIGURES_FOLDER + f"{operation}-{query}-{iterations}-responseTime")

  print ("Mean values:")
  print (df.mean())
  print ("STD values:")
  print (df.std())
  print ("S.E values:")
  print (df.sem())
  
createMemoryUsageFigure()
createResponseTimeFigure()