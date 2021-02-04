import React, { useState } from 'react';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [favArtists, setFavArtists] = useState("")
    const [favGenres, setFavGenres] = useState("")

    const newUser = {
        username: username,
        password: password,
        location: location,
        fav_artists: favArtists,
        fav_genres: favGenres,
        can_verify: true
    }

    console.log(newUser)

    function handleSubmit(event) {
        event.preventDefault()
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((r) => r.json())
            .then(data => {
                console.log(data)
            })
            
            
    }
    

    return (
        <div>
        <h1>Login</h1>
        <h1>Create New Account</h1>
        <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
                value={username} 
                onChange={(event) => setUsername(event.target.value)} 
                type="text"></input>
            <label>Password</label>
            <input 
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"></input>
            <label>Location</label>
            <input 
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                type="text"></input>
            <label>Favorite Artists</label>
            <input 
                value={favArtists}
                onChange={(event) => setFavArtists(event.target.value)}
                type="text"></input>
            <label>Favorite Genres</label>
            <input 
                value={favGenres}
                onChange={(event) => setFavGenres(event.target.value)}
                type="text"></input>
            <input type="submit"></input>
        </form>
        </div>
    )
}

export default Login