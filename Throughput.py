import pandas as pd
import matplotlib.pyplot as plt
import glob
import sys
import json
import os
import csv
from pathlib import Path

FIGURES_FOLDER = "./Figures"
ITERATIONS = [100, 500, 2500, 12500]

_, operation, query = sys.argv

filenames = glob.glob(f"./Results/*/{operation}/*-{operation}-{query}-*.json")

data = {
  "100": {},
  "500": {},
  "2500": {},
  "12500": {}
}

def throughput(response_times, iterations):
  response_time_seconds = sum(response_times) / 1000
  throughput_raw = iterations / response_time_seconds
  
  return throughput_raw

if len(filenames) != 12: 
   raise Exception(f"Data files insufficient") 

for file in filenames:
    with open(file) as infile:
      lib, op, qu, its = Path(file).stem.split("-")
      
      lib_data = json.load(infile)

      data[its][lib] = throughput(lib_data["responseTimes"], int(its))

def createThroughputTable():
  for it in data.keys():
    print(f"---- {it} ----")
    for lib, thr in data[it].items():
      print(f"{lib}: {thr} o/s")

  # Define target path, create folders if they do not exist
  target_folder = f"{FIGURES_FOLDER}/Throughput"
  os.makedirs(target_folder, exist_ok=True)

  target_file = f"{target_folder}/{operation}-{query}.csv"

  with open(target_file, "w+", newline="") as f:
    writer = csv.writer(f, delimiter=",")
    writer.writerow(["iterations", "MikroORM (Op/s)","Prisma (Op/s)","Sequelize (Op/s)"])

    for its, libs in data.items():
      throughputs = list(map(lambda x: format(x, ".3f"), list(libs.values())))
      writer.writerow([its] + throughputs)

createThroughputTable()