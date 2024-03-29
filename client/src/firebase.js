
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyD3j4DISvTDGkHAvBOVZj4qopuMU8gKiO0",
    authDomain: "yooking-b3279.firebaseapp.com",
    projectId: "yooking-b3279",
    storageBucket: "yooking-b3279.appspot.com",
    messagingSenderId: "221997584935",
    appId: "1:221997584935:web:ebe5be4bdf25fc37997402",
    measurementId: "G-PTHTPX4PV7",
    databaseURL: "https://yooking-b3279-default-rtdb.europe-west1.firebasedatabase.app/",
};


export const firebase = initializeApp(firebaseConfig);
export const database = getDatabase(firebase);
export const functions = getFunctions(firebase);
export const auth = getAuth(firebase);

