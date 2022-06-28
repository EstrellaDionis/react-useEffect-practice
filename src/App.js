import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //useEffect prevents this from becoming an infinite loop of checking for the logged in and re-rendering
  //this runs AFTER the App evaluates and not WITH the component and ONLY when the dependencies change (the array at the end)
  useEffect(() => {
    //grabbing the item in localStorage
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn')

    if (storedUserLoggedInInformation === '1'){
      setIsLoggedIn(true)
    }
  }, [])

  const loginHandler = (email, password) => {
    //these will be set in localStorage when logged in as the key | value pair
    localStorage.setItem('isLoggedIn', '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    //removed when logged out
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
