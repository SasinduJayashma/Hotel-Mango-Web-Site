var user = firebase.auth().currentUser;
var login_user_spinner = document.getElementById("login_user_spinner");
var signup_spinner = document.getElementById("signup_spinner");
var name1 = document.getElementById("name");
var email = document.getElementById("email");
var pass1 = document.getElementById("pass1");
var pass2 = document.getElementById("pass2");
document.getElementById("submit").onclick = function() {login()};
var validated = true;



// const btnLoginForm = document.getElementById('submit');

async function login() {
    
    login_user_spinner.className = "dashboard-spinner spinner-xs";

    console.log("Login");

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    var userType = "";
    var errorMessage = "";
    var errorCode = "";
    var loginError;
    var loginErrorMsg;

    await firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {

        errorCode = error.code;
        errorMessage = error.message;

        validated = false;

        console.log(error);
        
        switch (errorCode) {
            case "auth/wrong-password":
                loginErrorMsg = "Password is incorrect, please try again!";
                break;
            case "auth/user-not-found":
                loginErrorMsg = "There is no user exists!";
                break;
            case "auth/invalid-email":
                loginErrorMsg = "Email is incorrect, please try again!";
                break;
            case "auth/user-disabled":
                loginErrorMsg = "This user is disabled!";
                break;
        }

        Swal.fire(
            loginErrorMsg,
            'errorCode',
            'error'
        );

        login_user_spinner.className = "";
        
    })

    if(validated == true){
        location.replace("../index.html");
        console.log("Login Done");
        initApp();
    }
    

}
function logout() {
    console.log("logout");
    firebase.auth().signOut();
    location.replace("../pages/login.html");
}
async function initApp() {
    console.log("initApp");
    await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log("user signed in "+user.email);
            db.collection("mango-customers").where("user_email", "==", user.email)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    console.log("Doc Exists");
                    userName = doc.data().user_name;
                    user_Name.innerHTML += `${userName}`;
                });
            }).catch(function(error) {
                logout();
                Swal.fire(
                    error,
                    'Error',
                    'error'
                )
            });
        } else {
            // location.replace("../pages/login.html");
            // console.log("user signed out");
        }
    });
}
async function accountCreation() {
    console.log(email.value +" "+ pass1.value);

    // signup_spinner.className = "dashboard-spinner spinner-xs";

    if(pass1.value == pass2.value){
        console.log("1");
        console.log(email.value +" "+ pass1.value);

        await firebase.auth().createUserWithEmailAndPassword(email.value, pass1.value)
        .then(async (user1) => {
            console.log("2 - "+user1.id);
            var user = firebase.auth().currentUser;
            if (user) {
                console.log(user.uid);
                await db.collection("mango-customers").doc(user.uid).set({
                    isBooked: false,
                    user_email: email.value,
                    user_name: name1.value
                })
                .then(function(docRef) {
                    Swal.fire('Account Created', '', 'success');
                    location.replace("../index.html");
                });
            }

        }).catch((error) => {        
          var errorCode = error.code;
          var errorMessage = error.message;
          Swal.fire(errorMessage, errorCode, 'error');
        });

    }else{
        Swal.fire("Passwrods doesn't match", '', 'info');
    }

    

}
