import './App.css';

import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Base from './pages/Base';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/logged_in')
      .then(res => res.json())
      .then(body => { setIsLoggedIn(body['logged_in']) })
  }, [])
  
  console.log(isLoggedIn)

  return (
    <Routes>
      {isLoggedIn && (
        <Route path="/" element={ <Base/> }/>
      )}
      {!isLoggedIn && (
        <Route path="/" element={ <Login/> }/>
      )}
      <Route path='/signup' element={ <SignUp /> } />
    </Routes>
  );
}

export default App;
