import firebase from 'firebase/app';
import 'firebase/database'; // If using Firebase database
import 'firebase/storage';  // If using Firebase storage
const config = {
    apiKey: "AIzaSyAd2SAgrx1EPyI86rbBPGDRMINzNJlZEgg",
    authDomain: "socialnetwork-4c493.firebaseapp.com",
    databaseURL: "https://socialnetwork-4c493.firebaseio.com",
    projectId: "socialnetwork-4c493",
    storageBucket: "socialnetwork-4c493.appspot.com",
    messagingSenderId: "344888846702",
    appId: "1:344888846702:web:5cf89f8a46881fa414797f",
    measurementId: "G-W9HHQ5RFVM"
}
export const firebaseApp        = firebase.initializeApp(config);
export const postsRef           = firebase.database().ref("posts");