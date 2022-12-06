import './css/App.css';

import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Loading from './components/Loading';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/features/sessionSlice';
import { CssBaseline } from '@mui/material';
import DrawerBase from './pages/DrawerBase';

function App() {
  const loggedIn = useSelector(state => state.session.loggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    fetch('http://localhost:3000/logged_in', { credentials: 'include' })
    .then(res => res.json())
    .then(body => {
      body.logged_in ? dispatch(login()) : dispatch(logout())
    })
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        {/* Show only when Logged In */}
        {loggedIn && (
          <Route path="*" element={ <DrawerBase /> }/>
        )}

        {/* Show only when Logged In */}
        {!loggedIn && (
          <React.Fragment>
            <Route path="/" element={ <Login /> }/>
            <Route path="/login" element={ <Login /> } />
            <Route path='/signup' element={ <SignUp />} />
          </React.Fragment>
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
