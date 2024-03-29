import React, { useEffect, useState } from 'react';
import Navigation from "./Navigation";
import Footer from "./Footer";
import Cards from "./Cards";

import { auth, db } from '../firebase/firebase';

const CardPage = props => {
  const [id, setId] = useState(0);
  const [cardDetails, setCardDetails] = useState(props.location.card);
  const [games, setGames] = useState([]);

  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?category=';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '682881309amsh2bfbed79c2d1058p15337cjsn75651883c613',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  function getPrices(json) {
    for (let index = 0; index < json.length; index++) {
      const element = json[index];
      element.price = Math.trunc((Math.random() * 50).toFixed(2))
      json[index] = element;
    }
    return json;
  }

  useEffect(() => {
    setCardDetails(props.location.card);
    setId(props.match.params.id);

    if (!props.location.isForGame) {
      fetch(url + cardDetails.title, options)
        .then(response => response.json())
        .then(json => {
          json = getPrices(json)
          setGames(json)
        })
        .catch(error => console.error(error));
    }
  }, [props.location.card, props.location.isForGame, props.match.params.id]);

  return (
    <>
      <Navigation />
      <div className="container" style={{ margin: '150px auto', textAlign: 'center' }}>
        <h1>{cardDetails.title}</h1>
        <div className="overflow">
          <img src={cardDetails.thumbnail == null ? cardDetails.Poster : cardDetails.thumbnail} alt="image1" className="card-img-top" />
          {
            props.location.isForGame &&
            <div>
              <h1>Price: {Math.trunc(cardDetails.price)}₪</h1>
              <h1>Platform: {cardDetails.platform != null ? cardDetails.platform : ""}</h1>
              <h1>Release Date: {cardDetails.release_date != null ? cardDetails.release_date : ""}</h1>
              <h1>Description: {cardDetails.short_description != null ? cardDetails.short_description : ""}</h1>
            </div>
          }
        </div>
      </div>

      {!props.location.isForGame &&
        <div className="cards_together">
          <Cards userDetails={props.location.userDetails} isCategories={false} results={games} />
        </div>
      }
      <Footer />
    </>
  )
}

export default CardPage;