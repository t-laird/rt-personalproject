import React from 'react';
import Routes from '../Routes/Routes';
import './App.css';
import { withRouter } from 'react-router';

const App = withRouter(({ location }) => (
  <div className="App">
    <Routes location={location}/>
  </div>
));

export default App;
