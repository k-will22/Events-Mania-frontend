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
import AddEvent from './AddEvent'

function App() {
  const [events, setEvents] = useState([])
  const [artists, setArtists] = useState([])
  const [genres, setGenres] = useState([])
  const [user, setUser] = useState([])
  const [favoriteArtists, setFavoriteArtists] = useState([])
  const [favoriteGenres, setFavoriteGenres] = useState([])
  const [location, setLocation] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [userId, setUserId] = useState("")

  useEffect(() => {
  fetch("http://localhost:3000/events")
  .then(response => response.json())
  .then(data => {
    const sortedEvents = data.sort((a,b) => {
      return a.date.replace(/\D/g, '') - b.date.replace(/\D/g, '')})
      setEvents(sortedEvents)
  })
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
      {loggedIn ? <NavBar 
        setLoggedIn={setLoggedIn} 
        setUserId={setUserId}
        setEvents={setEvents} /> : 
      <Login 
        setLoggedIn={setLoggedIn} 
        setUserId={setUserId} />}
      </Route>
      <Switch>
      <Route path="/main">
        {loggedIn ? <Main 
          events={events}
          setEvents={setEvents} 
          userId={userId} 
          location={location}
          user={user} /> : <Redirect to="/" />}
      </Route>
      <Route path="/show">
        {loggedIn ? <Show /> : <Redirect to="/" />}
      </Route>
      <Route path="/favorites">
        {loggedIn ? <Favorite userId={userId} /> : <Redirect to="/" />}
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
          setLocation={setLocation}
          userId={userId} /> : <Redirect to="/" />}
      </Route>
      <Route path="/recommended">
        {loggedIn ? <Recommended 
          events={events} 
          favoriteArtists={favoriteArtists}
          favoriteGenres={favoriteGenres}
          location={location} /> : <Redirect to="/" />}
      </Route>
      <Route path="/add">
        {loggedIn ? <AddEvent 
          genres={genres}
          events={events}
          setEvents={setEvents} /> : <Redirect to="/" />}
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
      </Switch>
    </div>
  );
}

export default App;
