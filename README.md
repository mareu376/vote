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


* Circle 개체로 배경 디자인
