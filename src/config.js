import firebase from 'firebase/app';
import 'firebase/auth';


var config = {
    apiKey: "AIzaSyB7qLjllH4uBQUFpIpRAYM3ffBnPvSzq88",
    authDomain: "final-2e815.firebaseapp.com",
    databaseURL: "https://final-2e815.firebaseio.com",
    projectId: "final-2e815",
    storageBucket: "final-2e815.appspot.com",
    messagingSenderId: "389929468254"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;
