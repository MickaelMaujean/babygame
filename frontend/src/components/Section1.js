// src/components/Section1.js
import React from 'react';
import './section1.css';

function Section1({ content }) {
  return (
    <div className="section1">
      <h2> &#x1F44B; Bienvenue au grand jeu concours du futur membre de la famille Maujean &#x1F44B;</h2>
      <h1>Le jeu consiste à deviner certaines caractéristiques du bébé avec à la clé de belles récompenses pour les gagnants &#x1F3C6; &#x1F37E;</h1>
      <p>Voici quelques informations concernant les règles du jeu et le fonctionnement &#x1F476; :</p>
      <ul>
      <li>Tout d'abord indiquez vos prénoms et noms de famille pour mieux vous retrouver &#x1F604;</li>
      <li>Pour le sexe, toujours 2 choix (nous emmerdez pas avec le pronom iel merci) &#x1F604;</li>
      <li>Un nombre en cm pour la taille &#x1F4CF;</li>
      <li>Le poids en kg &#x2696;</li>
      <li>Et enfin la date de naissance, vous devez également renseigner l'heure estimée &#x23F0;</li>
      <li>Le bouton "send" enregistra votre vote &#x1F48C;</li>
      </ul>

      
    </div>
  );
}

export default Section1;