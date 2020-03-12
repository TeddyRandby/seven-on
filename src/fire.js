import firebase from 'firebase'
var config = { 
    apiKey: "AIzaSyB7y2MFCXzDvklQQm_dLzplKePy2NpZkVY",
    authDomain: "seven-on.firebaseapp.com",
    databaseURL: "https://seven-on.firebaseio.com",
    projectId: "seven-on",
    storageBucket: "seven-on.appspot.com",
    messagingSenderId: "132756920583",
    appId: "1:132756920583:web:63519138fabf8a3750cda2",
    measurementId: "G-QPTQ83FPYX"
};
var fire = firebase.initializeApp(config);
export default fire;