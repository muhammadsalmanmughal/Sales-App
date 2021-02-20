import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyBH2FkmGLoRI_av0f5cH63w832P36qBl5k",
  authDomain: "sales-app-c0bd0.firebaseapp.com",
  projectId: "sales-app-c0bd0",
  storageBucket: "sales-app-c0bd0.appspot.com",
  messagingSenderId: "922452764033",
  appId: "1:922452764033:web:8deb86e1670f1fa0227480"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default firebase

