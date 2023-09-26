// src/components/Section1.js
import React from 'react';
import './section1.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Section1({ content }) {

  const [userData, setUserData] = useState(null);
  const apiBaseUrl = process.env.REACT_APP_BACKEND_URL;

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      // Retrieve the userId from localStorage
      const userId = localStorage.getItem('userId');
      console.log(userId)

      // Check if userId is present in localStorage
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      // Fetch user data based on the retrieved user ID
      const response = await axios.get(`${apiBaseUrl}/users/${userId}`);

      if (response.status === 200) {
        setUserData(response.data);
      } else {
        console.error('Error fetching user data:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="section1">
      <h2> &#x1F44B; Bienvenue {userData && ` ${userData.email}`} &#x1F44B;</h2>
      <h1>Voici quelques informations concernant les règles du jeu et son fonctionnement &#x1F476; :</h1>
      <ul>
      <li>Tout d'abord indiques ton prénom et ton nom afin de te retrouver en cas de victoire &#x1F604;</li>
      <li>Pour le sexe c'est "Boy" ou "Girl" &#x1F604;</li>
      <li>La taille (en cm) &#x1F4CF;</li>
      <li>Le poids (en kg) &#x2696;</li>
      <li>Et enfin la date de naissance, tu dois également deviner l'heure !&#x23F0;</li>
      <li>Le bouton "send" validera ton vote &#x1F48C;</li>
      </ul>
      <h1>Pas de panique, tu pourras toujours modifier ton vote si besoin avec l'option "Edit"</h1>

      
    </div>
  );
}

export default Section1;