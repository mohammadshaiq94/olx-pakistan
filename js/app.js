auth.onAuthStateChanged( user => {
    if( button) {
        window.location.href = "index1.html";
    } else {
        console.log('submit your ad please!');
    }
})