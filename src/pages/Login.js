import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom'
import { Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/features/sessionSlice';
import Utilities from '../Utilities';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Login() {
  const [formDetails, setFormDetails] = useState({email: '', password: ''})
  const [formErrors, setFormErrors] = useState({message: ''})
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const user = {
      user: {
        email: data.get('email'),
        password: data.get('password')
      }
    }

    fetch(Utilities.railsUrls.login(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      credentials: 'include'
    })
    .then(res => res.json())
    .then(body => {
      
      if ('errors' in body) {
        setFormErrors({message: body.errors[0]})
      } else {
        doLogin();
      }
    })

    data.get('message')
  };

  function doLogin() {
    dispatch(login())
    navigate('/')
  }

  const clearFormErrors = () => {
    setFormErrors((state) => state = {message: ''})
  }

  const handleChange = (event) => {
    if (!!formErrors.message) {
      clearFormErrors();
    }
    const field = event.target.id;
    setFormDetails({ ...formDetails, [field]:[event.target.value] })
  }

  // console.log(isLoggedIn)

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Email Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          {/* Password Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          {!!formErrors.message && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${formErrors.message} `}</Typography>
            </Alert>
          )}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgot'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}