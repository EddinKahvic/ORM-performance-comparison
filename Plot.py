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

colors=["lightcoral", "lightgreen", "lightblue"]

if len(filenames) != 3: 
  raise Exception(f"Data files insufficient for operation {operation}") 

for file in filenames:
  with open(file) as infile:
    filename = Path(file).stem.split("-")[0]
    libs[filename] = json.load(infile)

def filterNegativeNumbers(arr):
  return [x for x in arr if x >= 0]

def createMemoryUsageFigure():
  mikroORM = pd.Series(filterNegativeNumbers(libs["MikroORM"]["memoryUsage"]))
  prisma = pd.Series(filterNegativeNumbers(libs["Prisma"]["memoryUsage"]))
  sequelize = pd.Series(filterNegativeNumbers(libs["Sequelize"]["memoryUsage"]))
  array = [mikroORM, prisma, sequelize]

  fig =  plt.figure(figsize=(8, 6))
  ax = fig.add_subplot()
  boxplot = ax.boxplot( array, patch_artist=True, showfliers=False, medianprops=dict(color="black"), labels=["MikroORM", "Prisma", "Sequelize"])

  for patch, color in zip(boxplot['boxes'], colors):
    patch.set_facecolor(color)

  plt.ylabel('Memory Usage (mb)')
  plt.title(f'Box plot of Memory Usage ({iterations} iterations)')
  plt.grid(True)
  plt.savefig(FIGURES_FOLDER + f"{operation}-{query}-{iterations}-memoryUsage")

def createResponseTimeFigure(): 
  mikroORM = pd.Series(filterNegativeNumbers(libs["MikroORM"]["responseTimes"]))
  prisma = pd.Series(filterNegativeNumbers(libs["Prisma"]["responseTimes"]))
  sequelize = pd.Series(filterNegativeNumbers(libs["Sequelize"]["responseTimes"]))
  array = [mikroORM, prisma, sequelize]

  fig =  plt.figure(figsize=(8, 6))
  ax = fig.add_subplot()
  boxplot = ax.boxplot( array, patch_artist=True, showfliers=False, medianprops=dict(color="black"), labels=["MikroORM", "Prisma", "Sequelize"])

  for patch, color in zip(boxplot['boxes'], colors):
    patch.set_facecolor(color)
  plt.ylabel('Reponse Time (ms)')
  plt.title(f'Box plot of Response Time ({iterations} iterations)')
  plt.grid(True)
  plt.savefig(FIGURES_FOLDER + f"{operation}-{query}-{iterations}-responseTime")
  
createMemoryUsageFigure()
createResponseTimeFigure()