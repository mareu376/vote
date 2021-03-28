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

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

    });

}

function logout() {

    firebase.auth().signOut();

}

const database = firebase.database();

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

function enterkey() {
    if (window.event.keyCode == 13) {
        login();
    }
}