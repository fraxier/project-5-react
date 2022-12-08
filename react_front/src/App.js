import './css/App.css';

import React, { useEffect } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './redux/features/sessionSlice';
import { CssBaseline } from '@mui/material';
import Base from './pages/Base';
import LoadingWheel from './components/LoadingWheel';
import Utilities from './Utilities';

function App() {
  const loggedIn = useSelector(state => state.session.loggedIn)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    fetch(Utilities.railsUrls.loggedIn(), { credentials: 'include' })
    .then(res => res.json())
    .then(body => {
      body.logged_in ? dispatch(login()) : dispatch(logout())
    })
  }, [])

  console.log(`${location.pathname} logged in? ${loggedIn.toString()}`)

  return (
    <React.Fragment>
      <CssBaseline />
      <Routes>
        {/* Show only when Logged In */}
        {loggedIn && (
          <Route path="*" element={ <Base loggedIn={loggedIn} /> }/>
        )}

        {/* Show only when Logged In */}
        {!loggedIn && (
          <React.Fragment>
            <Route path="/" element={ <Login /> }/>
            <Route path="/login" element={ <Login /> } />
            <Route path='/signup' element={ <SignUp />} />
            <Route path='*' element={ <LoadingWheel /> } />
          </React.Fragment>
        )}
      </Routes>
    </React.Fragment>
  );
}

export default App;
