import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
export default function Login() {
  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <h1 style={{ textAlign: 'center' }}>Login</h1>
      <TextField
        label='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label='Password'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <Button
        variant='contained'
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
              setIsLoggedIn(true);
            } else {
              setError('Invalid username or password');
              setIsLoggedIn(false);
            }
            setLoading(false);
          }, 1000);
        }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>
      {isLoggedIn && <h1>Welcome {username}</h1>}
      {error && <h1>{error}</h1>}
    </Box>
  );
}
