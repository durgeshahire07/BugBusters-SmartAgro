list1 = ['rice', 'wheat', 'Tea', 'millet', 'Lentil', 'Jute', 'Cotton', 'Ground Nut', 'Rubber', 'Sugarcane', 'Tobacco', 'Coconut', 'banana', 'grapes', 'mango', 'orange', 'papaya', 'pomegranate', 'watermelon']
import os,sys
import numpy as np 
import pandas as pd
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from joblib import load,dump

gbrt = load('climate_pred_test.joblib')
classes  = { 'alluvial':0 , 'red':1 ,'black':2 , 'clay':3 }
def result(soil,rain,hum,temp):
    sll = classes[soil.lower()]
    x =  [ sll , float(rain) , float(hum) , float(temp) ]
    x = np.array([x])
    res = gbrt.predict(x)
    print(res)
    return list1[res[0]]

print(result('black',22.16269576,58.90741579,103.4171832))

soil = str(sys.argv[1])
rain = float(sys.argv[2])
hum = float(sys.argv[3])
temp = float(sys.argv[4])

print(result(soil,rain,hum,temp))
