import firebase from "firebase/app"
import "firebase/firestore";
import firebaseConfig from "./config";

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
