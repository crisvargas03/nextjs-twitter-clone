import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3pZJ4a7m60wsLYRmd2skxtkRiMNoo9uI",
  authDomain: "devtweet-4d640.firebaseapp.com",
  projectId: "devtweet-4d640",
  storageBucket: "devtweet-4d640.appspot.com",
  messagingSenderId: "734472505146",
  appId: "1:734472505146:web:16da92307e594706f5f203",
  measurementId: "G-EXBJFNDQ39",
};

firebase.initializeApp(firebaseConfig);

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};
