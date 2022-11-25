import { Alert, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

export default function SignUp() {
  const [userDetails, setUserDetails] = useState({username: '', email: '', password: ''})
  const [errors, setErrors] = useState({username: '', email: '', password: ''})

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   username: data.get('username'),
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });

    const submission = {
      user: {
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
      }
    }

    fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submission)
    }).then(response => response.json())
    .then(body => {
      if ('errors' in body) {
        console.log('errors came back from server')
        for (const key in body.errors) {
          console.log(key)
        }
      } else {
        console.log("haeihpaeg")
      }
    })
  };

  const handleChange = (event) => {
    const field = event.target.id;
    setUserDetails({ ...userDetails, [field]:[event.target.value] })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Username Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userDetails.username}
            onChange={handleChange}
          />
          {/* Email Field */}
          <TextField
            error={!!errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userDetails.email}
            onChange={handleChange}
          />
          {!!errors.email && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${errors.email} `}</Typography>
            </Alert>
          )}
          {/* Password Field */}
          <TextField
            error={!!errors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userDetails.password}
            onChange={handleChange}
          />
          {!!errors.password && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${errors.password} `}</Typography>
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}