var profilePicture = document.getElementById('profilePicture');
var resetEmail = document.getElementById('resetEmail');
var supermarket_branch;
var qless_id;
var spm_code;
var signInCheck = document.getElementById("sign-in-check");

//Firebase configuration
// var firebaseConfig = {
//     apiKey: "AIzaSyAkpiQUO0e5CZkNyIv64lmKK13106YHIIk",
//     authDomain: "project-qless-selfcheckout.firebaseapp.com",
//     databaseURL: "https://project-qless-selfcheckout.firebaseio.com",
//     projectId: "project-qless-selfcheckout",
//     storageBucket: "project-qless-selfcheckout.appspot.com",
//     messagingSenderId: "868031304142",
//     appId: "1:868031304142:web:d4236af48afa23ee1e1b9f",
//     measurementId: "G-7L1FVSKL3G"
// };

var firebaseConfig = {
    apiKey: "AIzaSyA8NYZcHLnXbg2or3HRamArU7Ud5izp6TE",
    authDomain: "hotel-mango.firebaseapp.com",
    projectId: "hotel-mango",
    storageBucket: "hotel-mango.appspot.com",
    messagingSenderId: "745696424787",
    appId: "1:745696424787:web:51178f1e998ad4a666a7a6",
    measurementId: "G-8E8F14JR3T"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var storage = firebase.storage();
var functions = firebase.functions();
var perf = firebase.performance();

$(window).on('load', function() {

    $('#preloader-active').delay(450).fadeOut('slow');
    $('body').delay(450).css({
        'overflow': 'visible'
    });
});

function logout() {
    console.log("logout");
    firebase.auth().signOut();
    location.replace("../pages/login.html");
}

function initApp2() {

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {
            console.log("user signed in");
            signInCheck.style.visibility = "visible";
            // location.replace("../index.html");

            
        } else {    
            signInCheck.style.visibility = "hidden";
            // location.replace("../index.html");
            // console.log("user signed out");
        }
    });

}

window.onload = async function() {
     initApp2();
    await initApp();
};


