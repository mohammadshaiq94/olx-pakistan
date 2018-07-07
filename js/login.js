
//sign IN
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDU8AKmCLJDyLtuljRd0lx0Ubwm6wDkpp8",
    authDomain: "olx-pakistan-e99ae.firebaseapp.com",
    databaseURL: "https://olx-pakistan-e99ae.firebaseio.com",
    projectId: "olx-pakistan-e99ae",
    storageBucket: "olx-pakistan-e99ae.appspot.com",
    messagingSenderId: "99285581062"
  };
  firebase.initializeApp(config);


  console.log('Runnign!');
  let auth = firebase.auth();

document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then( res => console.log(res.user))
        .catch( error => console.log(error.message));

});


auth.onAuthStateChanged( user => {
    if( user ) {
        localStorage.setItem("user_mail",user.uid);
        window.location.href = "dashboard.html";
    } else {
        console.log('You Logged Out!');
    }
})
