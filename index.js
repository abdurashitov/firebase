
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("reg_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var data_list=document.getElementById("data_list");
      email_id = email_id.substring(0, email_id.indexOf("@"));
      document.getElementById("user_name").innerHTML = email_id;

      }

  } else {
    document.getElementById("user_name").innerHTML = "";

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("reg_div").style.display = "none";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  if (!validateEmail(userEmail)) {
      alert("Invalid email");
  } else {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("Error : " + errorMessage);
    });
  }
}

function reg_now(){
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("reg_div").style.display = "block";
}

function reg(){
  var userEmail = document.getElementById("email_reg_field").value;
  var userPass = document.getElementById("password_reg_field").value;
  var userPass2 = document.getElementById("password2_reg_field").value;

  if (!validateEmail(userEmail)) {
      alert("Invalid email");
  } else {
      if(userPass!==userPass2){
        alert("Passwords do not match");
      }else{
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      });
    }
  }
}



function validateEmail(email) {
  var pattern  = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return pattern .test(email);
}
