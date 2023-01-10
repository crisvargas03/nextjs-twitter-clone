import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

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

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

const mapUserFromFirebaseToUser = (user) => {
  // console.log(user);
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    userName: displayName,
    email,
    uid,
  };
};
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseToUser(user) : null;

    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, userID, userName }) => {
  return database.collection("devits").add({
    avatar,
    content,
    userID,
    userName,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestDevits = () => {
  return database
    .collection("devits")
    .orderBy("createAt", "desc")
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createAt } = data;

        return {
          ...data,
          id,
          createdAt: +createAt.toDate(),
        };
      });
    });
};

export const uploadImage = (file) => {
  const storage = getStorage();
  const spaceRef = ref(storage, `images/${file.name}`);
  const task = uploadBytesResumable(spaceRef, file);
  return task;
};
