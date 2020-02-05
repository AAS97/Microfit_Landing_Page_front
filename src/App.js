import React from 'react';
import logo from './assets/logo.png';
import './App.css';

import Card from './components/Card.js';
import MailForm from './components/MailForm.js'


import persona from './persona.js';


class App extends React.Component {
  constructor(props) {
    super(props);


    this.setUserInfo = this.setUserInfo.bind(this);
    this.addSelectedCards = this.addSelectedCards.bind(this);
    this.removeSelectedCards = this.removeSelectedCards.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cards = this.createCards();
  }

  infoObject = {
    userInfo: {},
    selectedCard: []
  };

  setUserInfo(userInfo) {
    this.infoObject['userInfo'] = userInfo;
    //console.log(this.infoObject.userInfo);
  };

  addSelectedCards(cardName) {
    this.infoObject['selectedCard'] = [...this.infoObject.selectedCard, cardName]
  };

  removeSelectedCards(cardName) {
    var array = [...this.infoObject['selectedCard']]; // make a separate copy of the array
    var index = array.indexOf(cardName)
    if (index !== -1) {
      array.splice(index, 1);
      this.infoObject['selectedCard'] = array;
    }
  }

  createCards() {
    let cards = [];
    for (var personaName in persona) {
      cards.push(<Card name={personaName} key={personaName} addSelectedCards={this.addSelectedCards} removeSelectedCards={this.removeSelectedCards}></Card>);
    }
    return cards;
  }

  infoValidation() {
    return new Promise((resolve, reject) => {
      if (this.infoObject.userInfo.Firstname === '' || this.infoObject.userInfo.Lastname === '' || this.infoObject.userInfo.Mail === '') {
        reject('Veuillez remplir l\'ensemble des champs');
      } else if (this.infoObject.selectedCard.length === 0) {
        reject('Veuillez sélectionner au mois une catégorie')
      }
      else {
        resolve(this.infoObject);
      }
    }
    )
  }

  handleSubmit() {
    this.infoValidation().then(
      (infoObject) => {
        const body = JSON.stringify({
          first: infoObject.userInfo.Firstname,
          last: infoObject.userInfo.Lastname,
          email: infoObject.userInfo.Mail,
          categorie: infoObject.selectedCard
        });
        //JSON.stringify(infoObject.selectedCard).replace('[', '{').replace(']', '}')
        fetch('http://localhost:3001/crud', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        })
          .then(response => response.json())
          .then(item => {
            if (Array.isArray(item)) {
              alert("Merci " + infoObject.userInfo.Firstname + " pour votre soutien")
            } else {
              alert(item.dbError);
              console.log("Erreur de la base de donnée")
            }

          })
          .catch(err => {
            console.log("erreur in fetch")
            console.log(err)


          });

      },
      (err) => { alert('Erreur de remplissage des données :\n' + err) }
    )
  }



  render() {
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="description">
          <h1>Retouvez le contrôle de votre microbiote intestinal </h1>
          <p>Notre équipe d'experts analyse votre microbiote et vous recommende des probiotiques personalisés</p>
        </div>
        <div className="cards">
          {this.cards}
        </div>
        <MailForm setUserInfo={this.setUserInfo} handleSubmit={this.handleSubmit} />
        <footer>
          <p>© 2020 Microfit Team, Paris</p>
        </footer>
      </div>
    );
  }
}

export default App;
