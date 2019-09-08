import React from 'react';
import logo from './logo.svg';
import './App.css';
import AppMenu from './components/AppMenu';
import { BrowserRouter, Route } from 'react-router-dom';
import AvailableMovies from './components/AvailableMovies';
import MyMovies from './components/MyMovies';
import CreditBalance from './components/CreditBalance';
import PurchaseMovie from './components/PurchaseMovie';
import SearchMovies from './components/SearchMovies';

function App() {
  return (
    <div style={{ padding: '0% 10% 0% 10%' }}>
      <AppMenu />
      <BrowserRouter>
        <div>
          <Route exact path="/" />
          <Route exact path="/available-movies" component={AvailableMovies} />
          <Route exact path="/my-movies" component={MyMovies} />
          <Route exact path="/purchase-movie" component={PurchaseMovie} />
          <Route exact path="/credit-balance" component={CreditBalance} />
          <Route exact path="/search-movies" component={SearchMovies} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
