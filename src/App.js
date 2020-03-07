import React from 'react';
import { Helmet } from 'react-helmet'
import logo from './assets/logo.png';
import './App.css';
import ReactGA from 'react-ga'

import Grid from '@material-ui/core/Grid';

import Card from './components/Card.js';
import MailForm from './components/MailForm.js'
import CustomSlider from './components/Carousel.js'


import persona from './persona.js';
import api_url from './api_url.js';

const trackingId = "UA-158734639-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview('/')

class App extends React.Component {
  constructor(props) {
    super(props);


    this.setUserInfo = this.setUserInfo.bind(this);
    this.addSelectedCards = this.addSelectedCards.bind(this);
    this.removeSelectedCards = this.removeSelectedCards.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cards = this.createCards();
    console.log("API url");
    console.log(api_url);
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
      cards.push(
        <Grid key={personaName} item>
          <Card name={personaName} key={personaName} addSelectedCards={this.addSelectedCards} removeSelectedCards={this.removeSelectedCards}></Card>
        </Grid>
      );
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

        fetch(api_url, {
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
        <Helmet>
          <title>Microfit</title>
        </Helmet>
        <img src={logo} className="App-logo" alt="logo" />
        <CustomSlider className="slider" />
        {/* <Grid item xs={50}> */}
        <Grid container justify="center" spacing='4'>
          {this.cards}
        </Grid>
        {/* </Grid> */}
        <MailForm setUserInfo={this.setUserInfo} handleSubmit={this.handleSubmit} />
        <footer>
          <p>© 2020 Microfit Team, Paris</p>
        </footer>
      </div>
    );
  }
}

export default App;
