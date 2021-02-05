import React, { useEffect, useState } from 'react';

function Account({user, artists, genres, favoriteArtists, favoriteGenres, setFavoriteArtists, setFavoriteGenres, location, setLocation}) {
    const [id, setId] = useState("")
    const [username, setUsername] = useState("")
    const [favArtists, setFavArtists] = useState("")
    const [favGenres, setFavGenres] = useState("")
    const [newLocation, setNewLocation] = useState("")

    const userId = 1

    const newUser = {
        location: newLocation
    }
    
    const fArtists = favoriteArtists.map(a => {
       return <h3>{a.artist.name} <button value={a.id} onClick={handleRemoveArtist}>Remove</button></h3>
    })

    const fGenres = favoriteGenres.map(g => {
        return <h3>{g.genre.name} <button value={g.id} onClick={handleRemoveGenre}>Remove</button></h3>
     })

    const newArtist = {
        user_id: userId,
        artist_id: favArtists
    }

    const newGenre = {
        user_id: userId,
        genre_id: favGenres
    }

    function handleSetGenre(event) {
        setFavGenres(event.target.value)
    }

    function handleSetArtist(event) {
        setFavArtists(event.target.value)
    }

    function handleNewArtist(event) {
        event.preventDefault()
        
        fetch("http://localhost:3000/favorite_artists", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newArtist),
          })
            .then((r) => r.json())
            .then(data => {
                setFavoriteArtists([...favoriteArtists, data])
            })
    }

    function handleNewGenre(event) {
        event.preventDefault()
        
        fetch("http://localhost:3000/favorite_genres", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newGenre),
          })
            .then((r) => r.json())
            .then(data => {
                setFavoriteGenres([...favoriteGenres, data])
            })
    }

    function handleRemoveArtist(event) {
        const artistId = event.target.value

        fetch(`http://localhost:3000/favorite_artists/${artistId}`, {
            method: "DELETE",
        })
            .then (r=> r.json())
            .then(data => {
                console.log(data)
            })
            const newArtistArr = user.favorite_artists.filter(f => f.id != artistId)
            setFavoriteArtists(newArtistArr)
    }

    function handleRemoveGenre(event) {
        const genreId = event.target.value

        fetch(`http://localhost:3000/favorite_genres/${genreId}`, {
            method: "DELETE",
        })
            .then (r=> r.json())
            .then(data => {
                console.log(data)
            })
            const newGenreArr = user.favorite_genres.filter(f => f.id != genreId)
            setFavoriteGenres(newGenreArr)
    }

    function handleLocation(event) {
        event.preventDefault()

        fetch(`http://localhost:3000/users/${userId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((r) => r.json())
            .then(data => {
                console.log(data)
            })
            setLocation(newLocation)
            setNewLocation("")
    }

    const artistList = artists.map(a => <option value={a.id}>{a.name}</option>)

    const genreList = genres.map(g => <option value={g.id}>{g.name}</option>)

        return (
            <div>
            <h1>{user.username}</h1>
            <h3>LOCATION: {location}</h3>
            <form onSubmit={handleLocation}>
            <input 
                type="text" 
                onChange={event => setNewLocation(event.target.value)}
                value={newLocation}>
            </input>&nbsp;
            <input type="submit" value="Change Location"></input>
            </form>
            <br></br>
            <h3>FAVORITE ARTISTS:</h3>
            {fArtists}
            <label>
                <select onChange={handleSetArtist}>
                    <option value="" >Choose Artist</option>
                    {artistList}
                </select>&nbsp;
                <input type="submit" value="Add Artist" onClick={handleNewArtist}></input>
            </label>
            <br></br>
            <br></br>
            <h3>FAVORITE GENRES:</h3>
            {fGenres}
            <label>
                <select onChange={handleSetGenre}>
                    <option value="" >Choose Genre</option>
                    {genreList}
                </select>&nbsp;
                <input type="submit" value="Add Genre" onClick={handleNewGenre}></input>
            </label>
            </div>
        )

}

export default Account