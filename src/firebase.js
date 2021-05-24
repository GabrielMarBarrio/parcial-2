import firebase from 'firebase/app'
import "firebase/firestore"

  const firebaseConfig = {
    apiKey: "AIzaSyBrQrOKsbccp89oUDXvdgvtLrx0lv0Qgxs",
    authDomain: "vue-todo-2021-4e0eb.firebaseapp.com",
    projectId: "vue-todo-2021-4e0eb",
    storageBucket: "vue-todo-2021-4e0eb.appspot.com",
    messagingSenderId: "659101143869",
    appId: "1:659101143869:web:ae49427a72a3062913eb54"
  };
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()