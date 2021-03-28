# 2021 CBSH 미니축제 투표 시스템 개발
2021 CBSH Sunday Festival Vote System

---

### index.html

* Google Firebase의 Auth, Realtime DB를 사용

```
<script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/8.3.1/firebase-storage.js"></script>

<script>
    var firebaseConfig = {
        apiKey: "***************************************",
        authDomain: "************************************",
        projectId: "********************",
        storageBucket: "********************************",
        messagingSenderId: "*************",
        appId: "******************************************",
        measurementId: "**********L"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
</script>
```

* 로그인 폼과 투표 페이지

```
<div id="login_div" class="main-div">
    <h1>CBSH</h1>
    <h1>Sunday</h1>
    <h1>Festival</h1>
    <br>
    <input type="email" placeholder="ex) 417s-3401@cberi.go.kr" id="email_field"/>
    <input onkeyup="enterkey()" type="password" placeholder="ex) 417s3401" id="password_field"/>

    <button class="round" onclick="login()">Login to Account</button>
</div>
```
```
<div id="user_div" class="loggedin-div">
    <button id="out1" onclick="cancel()">Cancel VOTE</button>
    <div id="vote_btn">
        <button id="round" onclick="vote()">V O T E</button>
    </div>
    <div id="done">
        <button id="doneround" disabled="disabled">D O N E</button>
    </div>
    <button id="out2" onclick="logout()">Logout</button>
</div>
```

* Circle 애니메이션으로 배경 디자인

```
<div class="circle" id="circle1"></div>
<div class="circle" id="circle2"></div>
<div class="circle" id="circle3"></div>
<div class="circle" id="circle4"></div>
<div class="circle" id="circle5"></div>
<div class="circle" id="circle6"></div>
<div class="circle" id="circle7"></div>
<div class="circle" id="circle8"></div>
```

---

### style.css

* Circle 색 및 애니매이션 부여

```
.circle {
    border-radius: 50%;
    position: fixed;
    animation-fill-mode: both;
    transition: transform 3s;
    background: linear-gradient(rgba(255, 100, 100, 0.6), rgba(255, 100, 100, 0.8));
}

.circle:active {
    transform: scale(2);
}
```
```
#circle1 {
    height: 100px;
    width: 100px;
    top: -50px;
    left: -30px;
    animation: amimation1 5s ease-in-out -2s infinite both;
    z-index: -1;
}

#circle2 {
    height: 180px;
    width: 180px;
    background: linear-gradient(rgba(255, 120, 120, 0.75), rgba(255, 100, 120, 0.9));
    right: -50px;
    top: 30px;
    z-index: 2;
    animation: amimation1 8s ease-in-out -4s infinite both;
    z-index: -1;
}

#circle3 {
    height: 90px;
    width: 90px;
    top: 180px;
    right: -45px;
    animation: amimation1 9s ease-in-out 0s infinite both;
    z-index: -1;
}

#circle4 {
    height: 140px;
    width: 140px;
    top: 230px;
    left: -50px;
    animation: amimation1 7s ease-in-out -1s infinite both;
    z-index: -1;
}

#circle5 {
    background: linear-gradient(rgba(255, 120, 120, 0.9), rgba(255, 100, 120, 0.75));
    height: 50px;
    width: 50px;
    right: 50px;
    top: 50vh;
    animation: amimation1 10s ease-in-out -3s infinite both;
    z-index: -1;
}

#circle6 {
    height: 150px;
    width: 150px;
    left: 70px;
    bottom: 170px;
    animation: amimation1 10s ease-in-out -6s infinite both;
    z-index: -1;
}

#circle7 {
    height: 80px;
    width: 80px;
    bottom: 10px;
    left: -10px;
    animation: amimation1 10s ease-in-out -8s infinite both;
    z-index: -1;
}

#circle8 {
    background: linear-gradient(rgba(255, 120, 120, 0.95), rgba(255, 100, 120, 0.75));
    height: 190px;
    width: 190px;
    right: -30px;
    bottom: -70px;
    animation: amimation1 5s ease-in-out -1s infinite both;
    z-index: -1;
}
```
```
@keyframes amimation1 {
    0% {
        transform: translateX(0px) translateY(0px);
    }

    25% {
        transform: translateX(-10px) translateY(5px);
    }

    50% {
        transform: translateX(0px) translateY(-10px);
    }

    75% {
        transform: translateX(10px) translateY(5px);
    }

    100% {
        transform: translateX(0px) translateY(0px);
    }

}
```

* button hover 이벤트 부여

```
.main-div button, .loggedin-div button {
    background : rgba(255, 100, 100, 0.8);
    color : #fff;
    border : 1px solid rgba(255, 100, 100, 0.8);
    border-radius : 5px;
    padding : 15px;
    display : block;
    width : 100%;
    transition : 0.3s;
    -webkit-transition : 0.3s;
    -moz-transition : 0.3s;
}

.main-div button:hover, .loggedin-div button:hover {
    background : #fff;
    color : rgba(255, 100, 100, 0.8);
    border : 1px solid rgba(255, 100, 100, 0.8);
    cursor : pointer;
}
```

* 반응형 웹사이트 → 모바일 용

```
@media (max-width: 767px){
    ...
}
```

---

### index.js

* Firebase Auth 유저 인식

로그인 되지 않은 상태에서는 로그인 폼만 visible
로그인 된 상태에서는 투표 화면만 visible

```
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";

        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;

            document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

        }

    } else {
        // No user is signed in.
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";

    }
});
```

* 로그인

이메일과 비밀번호 저장, 등록되지 않은 계정일 시 Error 코드 발송

```
function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

    });

}
```

* 로그아웃

```
function logout() {

    firebase.auth().signOut();

}
```

* 투표

투표 버튼을 누를 시, 만약 로그인 되지 않은 계정이라면 다시 로그인하도록 Alert 발송
Firebase Realtime DB로 투표 유무 저장 (투표 할 시 vote: 1, 투표 안할 시 vote: 0)

```
function vote() {

    if (document.getElementById("password_field").value == "") {
        window.alert("세션이 만료되었습니다.\n다시 로그인해주세요!");
        logout();
    }

    var userPass = document.getElementById("password_field").value;
    var rootRef = database.ref(userPass);
    var stopRef = database.ref('end');

    rootRef.set({
        vote: 1
    });

    rootRef.on("value", function (snapshot) {
        stopRef.on("value", function (stopshot) {
            if (snapshot.val().vote == 0 && stopshot.val().stop == 0) {
                document.getElementById("vote_btn").style.display = "block";
                document.getElementById("done").style.display = "none";
            } else {
                document.getElementById("vote_btn").style.display = "none";
                document.getElementById("done").style.display = "block";
            }
        });
    });

}
```

* 투표 취소

```
function cancel() {

    var userPass = document.getElementById("password_field").value;
    var rootRef = database.ref(userPass);
    var stopRef = database.ref('end');

    stopRef.on("value", function (stopshot) {
        if (stopshot.val().stop == 0) {
            rootRef.set({
                vote: 0
            });
        }
    });

}
```

---

### developer.html

진행자가 투표를 중지하거나 재설정할 수 있는 HTML 파일

* 투표 중단

DB에서 stop: 1이면 index.html에서 투표 버튼 사라짐

```
const database = firebase.database();
const stopRef = database.ref("end");

function stop() {
    stopRef.set({
        stop: 1
    });
}
```

* 투표 재시작

모든 유저의 DB에서 vote: 0으로 초기화

```
const user = [];

for (var i = 1; i <= 9; i++) {
    user.push('417s330' + String(i));
}
for (var i = 10; i <= 54; i++) {
    user.push('417s33' + String(i));
}
for (var i = 1; i <= 9; i++) {
    user.push('417s320' + String(i));
}
for (var i = 10; i <= 53; i++) {
    user.push('417s32' + String(i));
}
for (var i = 1; i <= 9; i++) {
    user.push('417s310' + String(i));
}
for (var i = 10; i <= 31; i++) {
    user.push('417s31' + String(i));
}

function refresh() {
    stopRef.set({
        stop: 0
    });

    for (var i = 0; i < user.length; i++) {
        var refreshRef = database.ref(user[i])
        refreshRef.set({
            vote: 0
        });
    }

}
```

---

### show.html

* Total 출력

DB에서 Total값 출력

```
const database = firebase.database();
const sumRef = database.ref("sum");

sumRef.on("value", function (snapshot) {
    var total = snapshot.val().total;
    document.getElementById("total").innerHTML = total;
});
```

---

### total.py

* 모든 유저의 vote값 더하고 total에 업로드

이걸 실시간으로 반응하게 하려고 많은 방법을 시도해보았지만
While문이 최선이었음

```
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
```
