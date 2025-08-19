# -*- coding: utf-8 -*-
"""
Created on Tue Feb  1 18:54:37 2022

@author: Saloni
"""

import pandas as pd
from sklearn import datasets
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn import metrics
import matplotlib.pyplot as plt
from sklearn import ensemble
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.model_selection import cross_val_score
from sklearn.model_selection import GridSearchCV


data = pd.read_csv(r"D:\Machine Learning\heart_failure.csv")
data.shape
x = data.iloc[:,:12]
y = data.iloc[:,-1]

y.value_counts()


############ Default Parameters for SVC
"""
class sklearn.svm.SVC(*, C=1.0, kernel='rbf', degree=3, gamma='scale', coef0=0.0, shrinking=True, probability=False, tol=0.001, cache_size=200, class_weight=None, verbose=False, max_iter=- 1, decision_function_shape='ovr', break_ties=False, random_state=None)[source]:
"""




########## On Complete Data
model = SVC()
model.fit(x,y)
print(model.score(x,y))
y_predict =model.predict(x) 
test_accuracy=metrics.accuracy_score(y,y_predict)*100
print("Accuracy for our testing dataset with tuning is : {:.2f}%".format(test_accuracy) )






########## On Test Train Split (Linear)
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2,stratify = y)
y_test.value_counts()



model = SVC(kernel = 'linear')
model.fit(x_train,y_train)
model.score(x_test,y_test)
print("Accuracy for our testing dataset with tuning is : {}".format(100*model.score(x_test,y_test)))



l = [i/10 for i in range(1,11)]
score= []
for k in l:
      model = SVC(C = k,kernel = 'linear')
      model.fit(x_train,y_train)
      score.append(model.score(x_test,y_test))
print(score)
    

kernel = ['linear']
param_grid = dict(C = l,kernel = kernel)
grid = GridSearchCV(model, param_grid, scoring='accuracy')
grid_search=grid.fit(x, y)
print(grid_search.best_params_) 


C_best = grid_search.best_estimator_.get_params()['C'])
svm = SVC(C = C_best,kernel = 'linear')
model.fit(a_train,y_train)
print("Accuracy  is",svm.score(x_test,y_test))





######## For Test train (radial or rbf)
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2,stratify = y)
y_test.value_counts()


kernel = ['linear','rbf']
g = [i/10 for i in range(1,11)]
param_grid = dict(C = l,kernel = kernel,gamma = g)
grid = GridSearchCV(model, param_grid, scoring='accuracy')
grid_search=grid.fit(x, y)
print(grid_search.best_params_) 

C_best = grid_search.best_estimator_.get_params()['C'])
g_best = grid_search.best_estimator_.get_params()['gamma'])
kernel_best = grid_search.best_estimator_.get_params()['kernel'])
svm = SVC(C = C_best,kernel = kernel_best,gamma = g_best)
model.fit(a_train,y_train)
print("Accuracy  is",svm.score(x_test,y_test))




############# For test train (poly)

clf = SVC(kernel='poly', degree=3,C=1)  #change degree = 2 and C and see
clf.fit(X, y)