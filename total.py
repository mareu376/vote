import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

if not firebase_admin._apps :
  cred = credentials.Certificate('cbsh-sunday-festival-firebase-adminsdk-rx08m-1beefa251e.json')
  firebase_admin.initialize_app(cred,{
      'databaseURL' : 'https://cbsh-sunday-festival-default-rtdb.firebaseio.com/'
  })

user = []
for i in range(1,32):
  user.append('417s31%02d'%i)
for j in range(1,54):
  user.append('417s32%02d'%j)
for k in range(1,55):
  user.append('417s33%02d'%k)


while(True) :

  total = 0

  for i in range(len(user)) :
    dir = db.reference(user[i] + '/vote')
    total += dir.get()

  dir = db.reference('sum')
  dir.update({'total':total})