import './App.css';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from './NavBar'
import Main from './Main';
import Show from './Show';
import Favorite from './Favorite';
import Login from './Login';

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
  fetch("http://localhost:3000/events")
  .then(response => response.json())
  .then(setEvents)
  }, [])

 

  
  return (
    <div className="App">
      <h1>EVENTS MANIA</h1>
      <NavBar />
      <Switch>
      <Route path="/main">
        <Main events={events} />
      </Route>
      <Route path="/show">
        <Show />
      </Route>
      <Route path="/favorites">
        <Favorite />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/">

      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
