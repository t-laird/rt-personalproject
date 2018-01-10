import React from 'react';
import Routes from '../Routes/Routes';
import './App.css';
import { Route } from 'react-router';

const App = () => (
  <div className="App">
    <Route to="/" component={Routes} />
  </div>
);

export default App;
