import './App.css';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from './NavBar'
import Main from './Main';
import Show from './Show';
import Favorite from './Favorite';
import Login from './Login';
import Account from './Account';

function App() {
  const [events, setEvents] = useState([])
  const [artists, setArtists] = useState([])
  const [genres, setGenres] = useState([])
  const [user, setUser] = useState([])
  const [favoriteArtists, setFavoriteArtists] = useState([])
  const [favoriteGenres, setFavoriteGenres] = useState([])
  const [location, setLocation] = useState("")

  const userId = 1

  useEffect(() => {
  fetch("http://localhost:3000/events")
  .then(response => response.json())
  .then(setEvents)
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/artists")
    .then(response => response.json())
    .then(setArtists)
  }, [])

  useEffect(() => {
    fetch("http://localhost:3000/genres")
    .then(response => response.json())
    .then(setGenres)
  }, [])

  useEffect(() => {
      fetch(`http://localhost:3000/users/${userId}`)
      .then(response => response.json())
      .then(setUser)
      }, [userId])

      useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
       
        setFavoriteArtists(user.favorite_artists)
        setFavoriteGenres(user.favorite_genres)
        setLocation(user.location)
        }, [userId, user])

  
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
      <Route path="/account">
        <Account 
          user={user} 
          artists={artists} 
          genres={genres}
          favoriteArtists={favoriteArtists}
          favoriteGenres={favoriteGenres}
          setFavoriteArtists={setFavoriteArtists}
          setFavoriteGenres={setFavoriteGenres}
          location={location}
          setLocation={setLocation} />
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
