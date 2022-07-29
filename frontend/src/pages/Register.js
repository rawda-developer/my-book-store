import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Stack
      component='form'
      sx={{
        '& > :not(style)': {
          m: 1,
          width: '200',
          maxWidth: '100%',
        },
      }}
      noValidate
      autoComplete='off'
    >
      <h1 style={{ textAlign: 'center' }}>Register</h1>
      <TextField
        label='Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label='Username'
        value={username}
        fullWidth
        id='fullWidth'
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        fullWidth
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label='Confirm Password'
        type='password'
        fullWidth
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <br />
      <Button
        variant='contained'
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            if (password === confirmPassword && password.length > 0) {
              setIsLoggedIn(true);
            } else {
              setError('Passwords do not match');
              setIsLoggedIn(false);
            }
          }, 1000);
        }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Signup'}
      </Button>
      {isLoggedIn && <h1>Welcome {username}</h1>}
      {error && <h1>{error}</h1>}
    </Stack>
  );
}
