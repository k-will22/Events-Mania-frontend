import './App.css';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from "react-router-dom";
import NavBar from './NavBar'
import Main from './Main';
import Show from './Show';
import Favorite from './Favorite';
import Login from './Login';
import Profile from './Profile';
import Recommended from './Recommended';

function App() {
  const [events, setEvents] = useState([])
  const [artists, setArtists] = useState([])
  const [genres, setGenres] = useState([])
  const [user, setUser] = useState([])
  const [favoriteArtists, setFavoriteArtists] = useState([])
  const [favoriteGenres, setFavoriteGenres] = useState([])
  const [location, setLocation] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

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
      <Route path="/">
      {loggedIn ? <NavBar setLoggedIn={setLoggedIn} /> : 
      <Login setLoggedIn={setLoggedIn} />}
      </Route>
      <Switch>
      <Route path="/main">
        {loggedIn ? <Main events={events} userId={userId} user={user} /> : <Redirect to="/" />}
      </Route>
      <Route path="/show">
        {loggedIn ? <Show /> : <Redirect to="/" />}
      </Route>
      <Route path="/favorites">
        {loggedIn ? <Favorite /> : <Redirect to="/" />}
      </Route>
      <Route path="/profile">
        {loggedIn ?<Profile 
          user={user} 
          artists={artists} 
          genres={genres}
          favoriteArtists={favoriteArtists}
          favoriteGenres={favoriteGenres}
          setFavoriteArtists={setFavoriteArtists}
          setFavoriteGenres={setFavoriteGenres}
          location={location}
          userId={userId} /> : <Redirect to="/" />}
      </Route>
      <Route>
        {loggedIn ? <Recommended 
          events={events} 
          favoriteArtists={favoriteArtists}
          favoriteGenres={favoriteGenres}
          user={user} /> : <Redirect to="/" />}
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
