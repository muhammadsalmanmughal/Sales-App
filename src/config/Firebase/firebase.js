import firebase from 'firebase'
import 'antd/dist/antd.css';
import { message } from 'antd';

var firebaseConfig = {
  apiKey: "AIzaSyC7D341MvVfGsVcbkDUlsJ8R7lpP9By_9Y",
  authDomain: "sales-app-469c8.firebaseapp.com",
  projectId: "sales-app-469c8",
  storageBucket: "sales-app-469c8.appspot.com",
  messagingSenderId: "751798875511",
  appId: "1:751798875511:web:290052df2258ab94905d72"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

const createUser = async (email, password, name) => {
  if (email == "" || password == "" || name == "") {
    message.error('Data is not in correct format')
  } else {
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (u) {
        const userId = u.user.uid;
        // localStorage.setItem("userID", userId);
        db.collection("Users").doc(userId).set({
          name,
          email,
        });
        message.success('Your account is been created successfully')
      })
      .catch(function (error) {
        console.log(error)
        message.error(error.message)
      });
  }
}

const loginUser = async (email, password) => {

  return await auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      message.success('WelCome')
      // localStorage.setItem("userID", userId);
    })
    .catch(function (error) {
      console.log(error);
      message.error(error.message)
    });

};
export default firebase
export {
  createUser,
  loginUser
}  
