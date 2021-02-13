import React, { useState } from 'react';

function Profile({user, artists, genres, favoriteArtists, favoriteGenres, setFavoriteArtists, setFavoriteGenres, location, setLocation, userId}) {
    const [favArtists, setFavArtists] = useState("")
    const [favGenres, setFavGenres] = useState("")
    const [newLocation, setNewLocation] = useState("")

    const newUser = {
        location: newLocation
    }
    


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

        if (newArtist.artist_id == 0) {
            return null
        }
        
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

        if (newGenre.genre_id == 0) {
            return null
        }
        
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

        console.log(artistId)

        fetch(`http://localhost:3000/favorite_artists/${artistId}`, {
            method: "DELETE",
        })
            .then (r=> r.json())
            .then(data => {
                console.log(data)
            })
            fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(data => {
            const newArtistArr = data.favorite_artists.filter(f => f.id != artistId)
            setFavoriteArtists(newArtistArr)
            })
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
            fetch(`http://localhost:3000/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                const newGenreArr = data.favorite_genres.filter(f => f.id != genreId)
                setFavoriteGenres(newGenreArr)
            })
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

    const fArtists = favoriteArtists.map(a => {
        return <h4 className="align1" key={a.id}>{a.artist.name} <button className="red" value={a.id} onClick={handleRemoveArtist}>Remove</button></h4>
     })
 
     const fGenres = favoriteGenres.map(g => {
         return <h4 className="align2" key={g.id}>{g.genre.name} <button className="red" value={g.id} onClick={handleRemoveGenre}>Remove</button></h4>
      })

    const sortedArtists = artists.sort((a,b) => {
        return a.name.localeCompare(b.name);
    })

    const sortedGenres = genres.sort((a,b) => {
        return a.name.localeCompare(b.name);
    })

    const artistList = sortedArtists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)

    const genreList = sortedGenres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)

        return (
            <div>
            <h1>Profile</h1>
            <br></br>
            <div className="event2">
            <h2>{user.username}</h2>
            <h3 className="underline">Location:</h3>
            <h3>{location}</h3>
            <form onSubmit={handleLocation}>
            <input 
                type="text" 
                onChange={event => setNewLocation(event.target.value)}
                value={newLocation}>
            </input>&nbsp;
            <input type="submit" value="Change Location"></input>
            </form>
            <br></br>
            <br></br>
            <h3 className="underline">Favorite Artists:</h3>
            {fArtists}
            <label>
                <select onChange={handleSetArtist}>
                    <option value="0">Choose Artist</option>
                    {artistList}
                </select>&nbsp;
                <input type="submit" value="Add Artist" onClick={handleNewArtist}></input>
            </label>
            <br></br>
            <br></br>
            <br></br>
            <h3 className="underline">Favorite Genres:</h3>
            {fGenres}
            <label>
                <select onChange={handleSetGenre}>
                    <option value="0">Choose Genre</option>
                    {genreList}
                </select>&nbsp;
                <input type="submit" value="Add Genre" onClick={handleNewGenre}></input>
            </label>
            <br></br>
            <br></br>
            </div>
            <br></br>
            </div>
        )
}

export default Profile