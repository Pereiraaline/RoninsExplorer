import React, { useState } from 'react';
import './App.css';
import BlockSearch from './components/BlockSearch';
import TransactionSearch from './components/TransactionSearch';
import BalanceSearch from './components/BalanceSearch';
import { GiSamuraiHelmet } from "react-icons/gi";
import { SiStellar } from "react-icons/si";

function App() {
  return (
    <div className="app">
      <header className="header">
        <i><GiSamuraiHelmet /></i>
        <h1>Ronins Descentralizados</h1>
      </header>
      <div className="body">
        <h2>Stellar Blockchain Explorer  <i><SiStellar /></i> </h2>
        <div className='grid-container'>
          <div className="features">
            <BlockSearch />
            <TransactionSearch />
            <BalanceSearch />
          </div>
          <div className='image-container'>
            <img src="images/blockchain-illustration.jpg" alt='Blockchain Illustration'></img>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Ronins Descentralizados Team - 2024 </p>
      </footer>
    </div>
  );
}

export default App;
