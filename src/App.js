import React,{ useState, useEffect } from 'react'
import './App.css';
import Login from './components/Login/Login'
import Router from './config/Route/index'
import {firebase} from './config/Firebase/firebase'
import Navbar from './components/Navbar/navbar'

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    listenAuthentication();
  }, []);
  const listenAuthentication = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      setIsLoading(false);
      setLoggedIn(user ? { email: user.email, uid: user.uid } : false);
    });
  };
  return (
    <div>
      {isLoggedIn ? <Navbar/> : ''}
      <Router
        isLoggedIn={isLoggedIn}
        isLoading={isLoading}
        uid={isLoggedIn.uid}
      />
      {console.log('is logged in---->', isLoggedIn)}
    </div>
  );
}

export default App;
