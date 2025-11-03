import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './userContext';
import { useNavigate } from 'react-router-dom';
import AxiosConfig from '../config/AxiosConfig';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await AxiosConfig.post('api/auth/login', {
        username,
        password
      });

      const token = response.data;
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1])); // jednostavno dekodiranje bez provere
      setUser(payload); // Popunjava context
      navigate('/profile');
    } catch (err) {
      setError('Login failed. Check data.');
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input type="text" placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default Login;
