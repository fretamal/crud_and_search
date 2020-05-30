import React from 'react';
import './App.scss';
import AddCard from './blocks/add-card/add-card'
import GameSection from './blocks/game-section/game-section';

const App = () => {

  return (
      <div className="container">

        <div className="header">
            <h1>Mis juegos favoritos</h1>
        </div>

        <AddCard/>

        <GameSection/>
        
      </div>
  );
}

export default App;
