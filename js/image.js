var config = {
  apiKey: "AIzaSyDU8AKmCLJDyLtuljRd0lx0Ubwm6wDkpp8",
  authDomain: "olx-pakistan-e99ae.firebaseapp.com",
  databaseURL: "https://olx-pakistan-e99ae.firebaseio.com",
  projectId: "olx-pakistan-e99ae",
  storageBucket: "olx-pakistan-e99ae.appspot.com",
  messagingSenderId: "99285581062"
};
firebase.initializeApp(config);

//Navigate to Home Page
function gotoHome() {
  window.location.href = "index.html";
}

let currentUser;
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user)
    currentUser = user.uid;
  }
})

//Submit Ad
function sumbitAnAdd(event) {
  event.preventDefault();

  //Getting Values
  var txtAdTitle = document.getElementById('txtAdTitle').value;
  var selectCatagory = document.getElementById('selectCatagory').value;
  var txtAdDescription = document.getElementById('txtAdDescription').value;
  var selectFile = document.getElementById('selectFile').files;
  var txtPhone = document.getElementById('txtPhone').value;
  var txtCity = document.getElementById('txtCity').value;
  var txtName = document.getElementById('txtName').value;

  let promises = uploadPics(selectFile);

  let urls = [];

  Promise.all(promises).then(function (res) {
    console.log(res)

    var allvalues = {
    txtAdTitle : txtAdTitle,
    selectCatagory : selectCatagory,
    txtAdDescription : txtAdDescription,
    txtName : txtName,
    txtPhone : txtPhone,
    txtCity : txtCity,
    AdAdderId : currentUser,
    imgs : res,
    date : new Date()
  }

    firebase.collection(selectCatagory).add(allvalues)
      .then((res) => {
        console.log('Ad Submitted Successfully');
      }).catch((e) => {
        var eCode = e.code;
        var eMessage = e.message;
        console.log(eMessage);
      })
  })
  // var allvalues = {
  //   txtAdTitle,
  //   selectCatagory,
  //   txtAdDescription,
  //   txtName,
  //   txtPhone,
  //   txtCity
  // }

  // console.log(allvalues);

  // //Getting User Id From Local Storage
  // var u_id = localStorage.getItem('user_id');

  // console.log(u_id);

  // firebase.firestore().collection('ads').doc(u_id).collection(selectCatagory).add(allvalues).then((res) =>{
  //   console.log('Ad Submitted Successfully');
  // }).catch((e) => {
  //   var eCode = e.code;
  //   var eMessage = e.message;
  //   console.log(eMessage);
  // })
}

const storage = firebase.storage();
console.log(storage);
function uploadPics(array) {
  let storageRef = storage.ref();

  let promises = [];

  for (let i = 0; i < array.length; i++) {

    promises.push(new Promise(function (resolve, reject) {
      let imgRef = storageRef.child("/images/" + Math.random() + ".jpg");
      imgRef.put(array[i])
        .then(function (snapshot) {
          imgRef.getDownloadURL().then(function (url) {
            console.log(url);
            resolve(url);
          })
        })
    }))

  }

  return promises;
}

