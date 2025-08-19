# -*- coding: utf-8 -*-
"""
Created on Thu Feb 17 10:20:37 2022

@author: Saloni Chugh
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

t = df['HeartDisease']
df.drop(['HeartDisease'],inplace =True,axis = 1)
df['HeartDisease'] = t


df['HeartDisease'] = t
df

df.drop(['HeartDisease','ChestPainType_NAP','RestingECG_ST','Scaled_RestingBP',
           'RestingECG_ST','RestingECG_Normal','ChestPainType_TA','RestingECG_LVH'],inplace = True,axis = 1)




from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
scaled_df = sc.fit_transform(df.iloc[:,1:18].to_numpy())
scaled_df = pd.DataFrame(scaled_df,columns = ['RestingBP', 'Cholesterol', 'FastingBS', 'MaxHR',
       'ExerciseAngina_0', 'ExerciseAngina_1', 'Oldpeak', 'ST_Slope',
       'Sex_F', 'Sex_M', 'RestingECG_LVH', 'RestingECG_Normal',
       'RestingECG_ST', 'ChestPainType_ASY', 'ChestPainType_ATA',
       'ChestPainType_NAP', 'ChestPainType_TA'] )




from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
df[["Scaled_Cholesterol","Scaled_MaxHR","Scaled_RestingBP"]]=sc.fit_transform(df[["Cholesterol","MaxHR","RestingBP"]])


df.drop(["Cholesterol","MaxHR","RestingBP"],axis= 1,inplace =True)






################### FEATURE SELECTION
df = pd.read_csv(r"C:\Users\Chugh\Downloads\HOHE.csv",index_col = 0)
x = np.array(df.iloc[:,:18])
y = np.array(df.iloc[:,18])
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size =0.2)

best_features  = SelectKBest(k = 18)
fit = best_features.fit(x_train,y_train)
df_scores = pd.DataFrame(fit.scores_)
df_columns = pd.DataFrame(df.columns)

feature_scores = pd.concat([df_columns,df_scores],axis =1)
feature_scores.columns = ['Feature_name','Score']
print(feature_scores.nlargest(18,'Score'))

df_univ_feat = feature_scores.nlargest(18,'Score')



################### Correlation
corr = df.corr()['HeartDisease'].sort_values(ascending = False)[1:]
corr
abs_corr = abs(corr)
relevant_features = abs_corr[abs_corr>0.4]
relevant_features
plt.figure(figsize = (12, 6), dpi = 200)
sns.heatmap(data = df.corr(), annot = True)
##, cmap = 'viridis'


svm_preds = svm_grid_model.predict(scaled_X_test)
print(classification_report(y_test, svm_preds))



################## SVM CLASSIFIER
# dup=pd.read_csv('HOHE.csv')
dup = pd.read_csv(r"C:\Users\Chugh\Downloads\HOHE.csv")
#dup = pd.get_dummies(dup, columns=["Sex"]).drop(['Unnamed: 0','Age','Sex'],axis=1,inplace=True)
# dup.drop('Unnamed: 0',axis=1,inplace=True)
x=dup.drop(['HeartDisease','Sex_M','Sex_F','Age','MaxHR'],axis=1)
y=dup.iloc[:,18]
score_list=[]
a = []
i = 0
j = 0
while j<2:
    score_list = []
    i = 0
    while i<3:
        dup_svm = SVC()
        x_train, x_test, y_train, y_test = train_test_split(x, y, test_size =0.1, stratify=y)
        dup_svm= SVC(kernel='linear')
        dup_svm.fit(x_train, y_train)
        y_predict=dup_svm.predict(x_test) 
        score_list.append(metrics.precision_score(y_test,y_predict))
        i+=1
    print(score_list)
    a.append(np.mean(score_list))
    j+=1
print(a)
print("Average values",np.mean(a))
    

# test_acc=np.mean(score_list)*100
# print("Accuracy for our testing dataset with tuning is :{:.2f}%".format(test_acc))

from sklearn.metrics import confusion_matrix,classification_report
confusion_matrix(y_predict,y_test)
print(classification_report(y_predict,y_test))


confusion_matrix(y_predict,y_test)
print(classification_report(y_predict,y_test))
plot_confusion_matrix(dup_svm, y_predict, y_test)





############ RANDOM FOREST CLASSIFIER 
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn import metrics

#df.drop('Unnamed: 0',axis=1,inplace=True)
df = pd.read_csv(r"C:\Users\Chugh\Downloads\HOHE.csv")
x=df.drop(['HeartDisease','Sex_M','Sex_F','Age','MaxHR'],axis=1)
y=df.iloc[:,3]
type(x)
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
score_list=[]
a = []
i = 0
j = 0
while j<3:
    score_list=[]
    i = 0
    while i<4:
        x_train, x_test,y_train,y_test = train_test_split(x,y,test_size=0.1)
        rfc=RandomForestClassifier(n_estimators=300,criterion='gini',random_state = 3)  
        rfc.fit(x_train , y_train)
        y_predict=rfc.predict(x_test)
        score=metrics.precision_score(y_test, y_predict)
        score_list.append(score)
        i+=1
    print(score_list)
    a.append(np.mean(score_list))
    j+=1
print("list -- a",a)
print("Average values",np.mean(a))
        



