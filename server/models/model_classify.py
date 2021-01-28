from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
#===================================================================================================================================================================
import os, sys, glob, re
import json
#================================================================================="THIS IS THE PART WHERE MODEL IS LOADED AND RESULTS ARE CALCULATED"========================
model1 = load_model('modelsoil.h5')
classes = {0:"alluvial", 1:"black", 2:"clay", 3:"red"}
def predict_soil(img_path):                                                        #this function predicts the soil soil_type
    image = load_img(img_path,target_size=(244,244))
    image = img_to_array(image)
    image=image/255
    image = np.expand_dims(image,axis=0)
    result = np.argmax(model1.predict(image))
    result = classes[result]
    return result

#change the labels before deploying models

#this will return the type of crops that can be grown
#need to expand the range of this function
#one way to do this is to create a standard SQL database and then store the crops and the soil required for it then the suggestion
#variable's data will be imported from the DB using SQLAlchemy this way there will be no need to alter this file rather the data will be sent to the database
def crop_suggest_estimate(soil):
    soil = soil.lower()
    suggestion = []
    if soil == "red" :
        suggestion=["wheat","cotton","pulses","tobacco","millets","oilseeds","potato","maize","groundnut"]
    elif soil == "black" :
        suggestion = ["cotton","pulses","millets","linseed","tobacco","sugarcane","vegetables","oranges" , "limes"]
    elif soil == "alluvial" :
        suggestion = ["Wheat", "rice", "maize", "sugarcane", "pulses", "oilseeds", "fruits", "vegetables", "leguminous crops", "soyabean","jute"]
    elif soil == "clay" :
        suggestion = ["lettuce","chard","brocolli","brussel sprouts","sweet corn","cabbage","pumpkin","rice","snap beans"]
    return suggestion

def __main__(img_path):
    soil = predict_soil(img_path)
    suggest = crop_suggest_estimate(soil)
    result = str(suggest)
    return result
