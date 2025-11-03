import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';
import { Link } from 'react-router-dom';
import "../styles/base.scss";

const LogoutButton = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Uklanjanje tokena iz localStorage-a
    localStorage.removeItem('token');

    // Resetovanje konteksta
    setUser(null);

    // Preusmeravanje na login stranicu
    navigate('/login');
  };

  return <li onClick={handleLogout}><Link className='nav-link'>Logout</Link></li>;
};

export default LogoutButton;
