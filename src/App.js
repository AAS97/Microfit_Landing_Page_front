import React from 'react';
import logo from './assets/logo.png';
import './App.css';

import Card from './components/Card.js';
import MailForm from './components/MailForm.js'


import persona from './persona.js';

function createCards() {
  let cards = [];
  for (var personaName in persona) {
    cards.push(<Card name={personaName} key={personaName}></Card>);
  }
  return cards;
}

function App() {
  let cards = createCards();
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div className="description">
        <h1>Retouvez le contrôle de votre microbiote intestinal </h1>
        <p>Notre équipe d'experts analyse votre microbiote et vous recommende des probiotiques personalisés</p>
      </div>
      <div className="cards">
        {cards}
      </div>
      <MailForm />
      <footer>
        <p>© 2020 Microfit Team, Paris</p>
      </footer>
    </div>
  );
}

export default App;
