import { Alert, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { redirect, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const baseState = {username: '', email: '', password: ''}
  const [formDetails, setFormDetails] = useState({...baseState})
  const [formErrors, setFormErrors] = useState({...baseState})
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    clearFormErrors();
    const data = new FormData(event.currentTarget);

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
      body: JSON.stringify(submission),
      credentials: 'include'
    })
    .then(response => response.json())
    .then(body => {
      if ('errors' in body) {
        console.log('errors came back from server')
        for (const key in body.errors) {
          
          body.errors[key].unshift(key.toString());
          setFormErrors((state) => {
            return {
              ...state,
              [key]: body.errors[key].join(' ')
            };
          })
        }
      } else {
        navigate('/dash')
      }
    })
  };

  const clearFormErrors = () => {
    setFormErrors((state) => state = {...baseState})
  }

  const handleChange = (event) => {
    const field = event.target.id;
    setFormDetails({ ...formDetails, [field]:[event.target.value] })
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
            value={formDetails.username}
            onChange={handleChange}
          />
          {!!formErrors.username && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${formErrors.username} `}</Typography>
            </Alert>
          )}
          {/* Email Field */}
          <TextField
            error={!!formErrors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formDetails.email}
            onChange={handleChange}
          />
          {!!formErrors.email && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${formErrors.email} `}</Typography>
            </Alert>
          )}
          {/* Password Field */}
          <TextField
            error={!!formErrors.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formDetails.password}
            onChange={handleChange}
          />
          {!!formErrors.password && (
            <Alert severity='error'>
              <Typography variant='code'>{` ${formErrors.password} `}</Typography>
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