# -*- coding: utf-8 -*-
"""
Created on Thu Feb 17 20:24:09 2022

@author: Chugh
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.svm import SVC
from sklearn import metrics
import seaborn as sns
from sklearn.model_selection import GridSearchCV
from sklearn.model_selection import train_test_split
from sklearn.feature_selection import SelectKBest

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn import metrics

df = pd.read_csv('HOHE.csv')

#df.drop('Unnamed: 0',axis=1,inplace=True)
x=df.drop('HeartDisease',axis=1)
y=df.iloc[:,3]
type(x)




dup_svm = SVC()
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size =0.1, stratify=y)
dup_svm= SVC(kernel='linear')
dup_svm.fit(x_train, y_train)
y_predict=dup_svm.predict(x_test) 
    
    
    
    
from sklearn.model_selection import train_test_split

from sklearn.ensemble import RandomForestClassifier


x_train, x_test,y_train,y_test = train_test_split(x,y,test_size=0.2)

rfc=RandomForestClassifier(n_estimators=300,criterion='gini')  
rfc.fit(x_train , y_train)
y_predict_rfc=rfc.predict(x_test)
 #i+=1
score=metrics.precision_score(y_test, y_predict_rfc)

print(score)





from sklearn.metrics import roc_curve, auc

rfc_fpr, rfc_tpr, threshold = roc_curve(y_test, y_pred_rfc)
auc_rfc = auc(rfc_fpr, rfc_tpr)

svm_fpr, svm_tpr, threshold = roc_curve(y_test, y_pred_svm)
auc_svm = auc(svm_fpr, svm_tpr)

plt.figure(figsize=(5, 5), dpi=100)
plt.plot(svm_fpr, svm_tpr, linestyle='-', label='SVM (auc = %0.3f)' % auc_svm)
plt.plot(logistic_fpr, logistic_tpr, marker='.', label='Random (auc = %0.3f)' % auc_rfc)

plt.xlabel('False Positive Rate -->')
plt.ylabel('True Positive Rate -->')

plt.legend()

plt.show()