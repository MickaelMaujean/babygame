// src/auth/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      const timerId = setTimeout(clearLoginMessage, 5000); // 10 seconds (10,000 milliseconds)
      
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

        const userId = response.data.id;
        // Store the userId in localStorage
        localStorage.setItem('userId', userId);

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
        const timerId = setTimeout(clearRegistrationMessage, 5000); // 5 seconds
        
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
      setRegistrationMessage('Inscription échouée, utilises un email valide !');
    }
  }

  return (
    <div className="login-page">
      <video className="snowfall" autoPlay loop muted>
      <source src="https://babygame.s3.eu-central-1.amazonaws.com/170307_Particles_22_1080p.mp4" type="video/mp4" />
      </video>
      <img src="/images/alpes.jpg" className="alpes" alt="Image 1" />
      <img src="/images/grotte-glace.jpg" className="grotte-glace" alt="Image 2" />
      <div className="login-container">
        <div className="title-box">
          <h2>&#128153; Grand jeu concours &#128151;</h2>
          <h1>Afin d'accueillir comme il se doit le nouveau membre de la famille Maujean, ses parents ont mis en place un jeu pour vous impliquer dans cette aventure</h1>
          </div>
          <div className="explanation-box">
          <h1>Pour participer au jeu merci de t'inscrire avec ton email et un mot de passe dans un premier temps et te connecter ensuite</h1>
          <p> &#33;&#33;&#33;&#33; La deadline pour voter est le 25 décembre - Seuls les participants ayant deviné le bon sexe seront considérés pour les récompenses</p>
          <ul>
            <li>Une récompense pour le plus proche du poids exact</li>
            <li>Une récompense pour le plus proche de la taille exacte</li>
            <li>Une récompense pour le plus proche de la naissance exacte</li>
          </ul>
          </div>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="login-button">Let's Go !</button>
          <button onClick={handleRegister} className="register-button">Inscription</button>
          {registrationMessage && <p className="registration-message">{registrationMessage}</p>}
          {LoginMessage && <p className="login-message">{LoginMessage}</p>}
        </div>
      </div>
  );
}
export default Login;

