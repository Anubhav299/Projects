# -*- coding: utf-8 -*-
"""
Created on Thu Feb  3 14:51:45 2022

@author: Saloni Chugh
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


# data = pd.read_csv(r"C:\Users\Chugh\Desktop\My stufff\Machine Learning\heartdisease.csv",index_col = 0)

data = pd.read_csv(r"C:\Users\Chugh\Desktop\My stufff\Machine Learning\HOHE.csv",index_col = 0)
data.shape
x = data.iloc[:,:12]
y = data.iloc[:,-1]

y.value_counts()



# ### Making x and y
# x = r.iloc[:,:7]
# y = r.iloc[:,-1:]

u = data.corr()

l = u[(abs(u)>0.35) & (abs(u)<1)]
sns.heatmap(u)

X_new = SelectKBest(chi2, k=2).fit_transform(x, y)



########### Label Encoding
def LABEL_ENCODING(data,c1):
    from sklearn import preprocessing
    label_encoder = preprocessing.LabelEncoder()
    data[c1]= label_encoder.fit_transform(data[c1])
    data[c1].unique()
    
    
LABEL_ENCODING(data,"sex")




############## CV results using train-test + Cross Validation
for i in range(1,11):
    x_train, x_test, y_train, y_test = train_test_split(x, y,test_size = 0.2, stratify = y)
    knn = KNeighborsClassifier()
    
    k_range = list(range(1, 11))
    weight = ['uniform', 'distance']
    ps=[1,2]
    param_grid = dict(n_neighbors=k_range,weights=weight,p=ps)
    grid = GridSearchCV(knn, param_grid, cv=10, scoring='accuracy')
    # fitting the model for grid search
    grid_search=grid.fit(x_train, y_train)
    
    
    best_k = grid_search.best_estimator_.get_params()['n_neighbors']
    best_w = grid_search.best_estimator_.get_params()['weights']
    best_p = grid_search.best_estimator_.get_params()['p']
    
    knn = KNeighborsClassifier(n_neighbors=best_k,p=best_p,weights = best_w)
    
    knn.fit(x_train, y_train)
    
    y_test_hat=knn.predict(x_test) 
    
    test_accuracy=metrics.accuracy_score(y_test,y_test_hat)*100
    print(grid_search.best_params_)
    # print("Precision score",score1)
    # print("Accurac SCore",score)
    # print("Recall",score2)
    # print("F1 score",score3)
    print("Accuracy for our testing dataset with tuning is : {:.2f}%".format(test_accuracy) )
















# x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2,stratify = y)
# y_test.value_counts()

# model = SVC(kernel = 'linear')
# model.fit(x_train,y_train)
# model.predict(x_test)
# y_predict =model.predict(x_test) 
# # print("Accuracy for our testing dataset with tuning is : {}".format(100*model.score(x_test,y_test)))
# print(metrics.f1_score(y_test,y_predict))






# from sklearn import ensemble
# x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2)
# k = ensemble.RandomForestClassifier()
# k.fit(x_train,y_train)
# y_predict = k.predict(x_test)
# score = metrics.accuracy_score(y_test,y_predict)
# score1 = metrics.precision_score(y_test,y_predict)
# score2 = metrics.recall_score(y_test,y_predict)
# score3 =metrics.f1_score(y_test, y_predict)
# print("Precision score",score1)
# print("Accurac SCore",score)
# print("Recall",score2)
# print("F1 score",score3)
# print(metrics.confusion_matrix(y_test,y_predict))
