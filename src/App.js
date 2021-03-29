import React, { useState, useEffect } from 'react'
import { VendorCustomerProvider } from './context/Random/random'
import './App.css';
import Router from './config/Route/index'
import firebase from 'firebase'

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
      <VendorCustomerProvider>
        <Router
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          uid={isLoggedIn.uid}
        />
      </VendorCustomerProvider>
    </div>
  );
}

export default App;
