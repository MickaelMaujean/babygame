// src/auth/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './login.css';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [LoginMessage, setLoginMessage] = useState(''); 
  const navigate = useNavigate();
  const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;
  console.log("apiBaseUrl:", apiBaseUrl);


  const clearLoginMessage = () => {
    setLoginMessage('');
  };

  useEffect(() => {
    // Use useEffect to automatically clear the success message after a delay
    if (LoginMessage) {
      const timerId = setTimeout(clearLoginMessage, 10000); // 10 seconds (10,000 milliseconds)
      
      // Clean up the timer when the component unmounts or when successMessage changes
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [LoginMessage]);

  const handleLogin = async () => {
 
    // if (username === 'username' && password === 'password') {
      // If login is successful, navigate to the desired page
      //setIsLoggedIn(true);
      //navigate('/');
    //} else {
      // Handle login failure (e.g., display an error message)
     // alert('Oops, essaye encore et/ou inscris toi avant !');

     try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await axios.post(`${apiBaseUrl}/login`, formData,{
        withCredentials: true,
      });
      if (response.status == 200) {

        console.log('Token before storing:', token);
        const token = response.data.token;

        localStorage.setItem('token', token.toString());
        console.log('Token after storing:', localStorage.getItem('token'));

        setIsLoggedIn(true);
        navigate('/');
      } else {
        setLoginMessage('Email ou mot de passe invalide');
      }
      }
      catch (error) {
        console.error('Error during registration:',error);
        setLoginMessage('Email ou mot de passe invalide');
      }
     }

    const clearRegistrationMessage = () => {
      setRegistrationMessage('');
    };
  
    useEffect(() => {
      // Use useEffect to automatically clear the success message after a delay
      if (registrationMessage) {
        const timerId = setTimeout(clearRegistrationMessage, 5000); // 10 seconds (10,000 milliseconds)
        
        // Clean up the timer when the component unmounts or when successMessage changes
        return () => {
          clearTimeout(timerId);
        };
      }
    }, [registrationMessage]);  

  const handleRegister = async () => {
    try {
        // Make a POST request using Axios
      const response = await axios.post(`${apiBaseUrl}/users`, {
        email: username,
        password,
      });
  
      if (response.status === 201) {
          // Registration successful
        setRegistrationMessage('Incription validée, connectes toi !');
      } else {
          // Registration failed
        setRegistrationMessage('Inscription échouée, utilises un email valide !');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setRegistrationMessage('Registration failed. Please try again.');
    }
  }

  return (
    <div className="login-container">
      <h2>Connection</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    <button onClick={handleLogin} className="login-button">Let's Go !</button>
    <button onClick={handleRegister} className="register-button">Inscription</button>
    {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
    {LoginMessage && <p className="login-message">{LoginMessage}</p>}
    </div>
  );
}
export default Login;
