import firebase from 'firebase';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const firebaseConfig = {
    apiKey: "AIzaSyCK0wE6gaD2VRmoiSNQaXL337sJCIB_t4A",
    authDomain: "sales-app-82a32.firebaseapp.com",
    projectId: "sales-app-82a32",
    storageBucket: "sales-app-82a32.appspot.com",
    messagingSenderId: "766837989511",
    appId: "1:766837989511:web:81a5c4684dfef97e3bd822"
  };
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const db = firebase.firestore();

const registerUser = async (userName, email, password) =>{
  console.log('email----->',email)
  console.log('pass----->',password)
  console.log('name----->',userName)
  // if (userName == "" || email == "" || password == "") {
  //   toast.error("Data is not in correct format", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     autoClose: 4000,
  //     hideProgressBar: true,
  //   });
  // } else {
  //   return await auth.createUserWithEmailAndPassword(email, password)
  //   .then(function (u) {
  //     const userId = u.user.uid;
  //     localStorage.setItem("userID", userId);
  //     firebase.firestore().collection("Users").doc(userId).set({
  //       userName,
  //       email,
  //     });
  //   })
  //   .catch(function (error) {});
  // }
}
const loginUser = async (email, password) =>{
    return await auth.signInWithEmailAndPassword(email, password)
    
  }
export {
    firebase,
    registerUser,
    loginUser
}