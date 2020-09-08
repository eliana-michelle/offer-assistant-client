import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import './App.css';

import Header from './app/components/Header/Header'
import LandingPage from './app/pages/LandingPage/LandingPage'

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route exact path="/" component={LandingPage} />
      </Router>
    </div>
  );
}

export default App;
