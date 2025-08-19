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


data = pd.read_csv(r"C:\Users\Chugh\Desktop\My stufff\Machine Learning\heart_failure.csv")
data.shape
x = data.iloc[:,:12]
y = data.iloc[:,-1]

y.value_counts()

"""class sklearn.ensemble.RandomForestClassifier(n_estimators=100, *, criterion='gini', max_depth=None, min_samples_split=2, min_samples_leaf=1, min_weight_fraction_leaf=0.0, max_features='auto', max_leaf_nodes=None, min_impurity_decrease=0.0, bootstrap=True, oob_score=False, n_jobs=None, random_state=None, verbose=0, warm_start=False, class_weight=None, ccp_alpha=0.0, max_samples=None
"""


############### Random Forest
from sklearn import ensemble
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2,stratify = y)

# l1=[]
# l2 = []
# l3 =[]
# l4= []
# for i in range(1,10):
#     k = ensemble.RandomForestClassifier(n_estimators = 200,criterion = 'gini')
#     k.fit(x_train,y_train)
#     y_predict = k.predict(x_test)
#     score = metrics.accuracy_score(y_test,y_predict)
#     score1 = metrics.precision_score(y_test,y_predict,average = 'macro')
#     score2 = metrics.recall_score(y_test,y_predict)
#     score3 =metrics.f1_score(y_test, y_predict)
#     l1.append(score)
#     l2.append(score1)
#     l3.append(score2)
#     l4.append(score3)

#     #print(metrics.confusion_matrix(y_test,y_predict))



# print("Precision score",np.mean(l2)*100)
# print("Accuracy Score",np.mean(l1)*100)
# print("Recall",np.mean(l3)*100)
# print("F1 score",np.mean(l4)*100)





# ################### Feature importance
# from sklearn.tree import DecisionTreeClassifier
# from sklearn import metrics
# dtc=DecisionTreeClassifier(max_depth=3)
# dtc.fit(x_train,y_train)
# y_predict=dtc.predict(x_test)
# score=metrics.accuracy_score(y_test, y_predict)
# print(score)
# print(metrics.confusion_matrix(y_test, y_predict))

# dtc.feature_importances_
# import pandas as pd
# import numpy as np
# importances = pd.DataFrame({'feature':pd.DataFrame(x_train).columns,'importance':np.round(dtc.feature_importances_,3)})
# importances = importances.sort_values('importance',ascending=False)
# print(importances)





param_grid = {
    'n_estimstors':[10,200],'max_features':['auto','sqrt']}
gs = GridSearchCV(estimator = k, param_grid = pram_grid,scoring =s)
gs.fit(x_train,y_train)





############ Default Parameters for SVC
"""
class sklearn.svm.SVC(*, C=1.0, kernel='rbf', degree=3, gamma='scale', coef0=0.0, shrinking=True, probability=False, tol=0.001, cache_size=200, class_weight=None, verbose=False, max_iter=- 1, decision_function_shape='ovr', break_ties=False, random_state=None)[source]:
"""


# ########## On Complete Data
# model = SVC(kernel = 'linear')
# model.fit(x,y)
# print(model.score(x,y))
# y_predict =model.predict(x) 
# test_f1score = metrics.f1_score(y_test, y_predict)
# test_accuracy=metrics.accuracy_score(y,y_predict)*100
# # print("Accuracy for our testing dataset with tuning is : {:.2f}%".format(test_accuracy) )
# print(test_f1score)




########## On Test Train Split (Linear)
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2,stratify = y)
y_test.value_counts()

model = SVC(kernel = 'linear')
model.fit(x_train,y_train)
model.score(x_test,y_test)
# print("Accuracy for our testing dataset with tuning is : {}".format(100*model.score(x_test,y_test)))
print(metrics.f1_score(y,y_predict))













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