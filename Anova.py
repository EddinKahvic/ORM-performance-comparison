import pandas as pd
import matplotlib.pyplot as plt
import glob
import sys
import json
import scipy.stats as stats
import numpy as np
import statsmodels.stats.multicomp as multi
from pathlib import Path

FIGURES_FOLDER = "./Figures"
ITERATIONS = [100, 500, 2500, 12500]

_, operation, query, datatype = sys.argv

filenames = glob.glob(f"./Results/*/{operation}/*-{operation}-{query}-*.json")

data = {
  "100": {},
  "500": {},
  "2500": {},
  "12500": {}
}

if len(filenames) != 12: 
   raise Exception(f"Data files insufficient") 

def anova(*data):
  statistic, p_value = stats.f_oneway(data[0], data[1], data[2])

  print(f"ANOVA statistic {str(statistic)} and p-value {p_value}")
  
  return p_value < statistic

for file in filenames:
    with open(file) as infile:
      lib, op, qu, its = Path(file).stem.split("-")

      lib_data = json.load(infile)

      data[its][lib] = lib_data[datatype]

def tukey(*data):
  groups = ['MikroORM', 'Prisma', 'Sequelize']
  df = pd.DataFrame()

  df[groups[0]] = data[0]
  df[groups[1]] = data[1]
  df[groups[2]] = data[2]

  stacked_data = df.stack().reset_index()
  stacked_data = stacked_data.rename(columns={'level_0':'id', 'level_1':'treatment', 0:'result'})

  res2 = multi.pairwise_tukeyhsd(stacked_data['result'], stacked_data['treatment']) 
  print(res2)
  
def analysis():
  for its, libs in data.items():
    if(anova(libs["MikroORM"], libs["Prisma"], libs["Sequelize"])):
        tukey(libs["MikroORM"], libs["Prisma"], libs["Sequelize"])
    else:
       print(f"No Tukey performed for: {its} iterations")

analysis()