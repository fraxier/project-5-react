import './css/App.css';

import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Base from './pages/Base';
import SignUp from './pages/SignUp';
import Loading from './components/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/features/sessionSlice';
import { CssBaseline } from '@mui/material';

function App() {
  const loggedIn = useState(useSelector(state => state.session.loggedIn))
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3000/logged_in', { credentials: 'include' })
    .then(res => res.json())
    .then(body => {
      body.loggedIn ? dispatch(login()) : dispatch(logout())
    })
  }, [])
  
  console.log(loggedIn)

  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        {/* Show only when Logged In */}
        {loggedIn && (
          <Route path="*" element={ <Base/> }/>
        )}

        {/* Show only when Logged In */}
        {!loggedIn && (
          <React.Fragment>
            <Route path="/" element={ <Navigate to='/login' /> }/>
            <Route path="/login" element={ <Login /> } />
          </React.Fragment>
        )}
        
        {/* Show at all times */}
        <Route path='/signup' element={ <SignUp /> } />
        <Route path='*' element={ <Navigate to='/' /> } />
      </Routes>
    </React.Fragment>
  );
}

export default App;
