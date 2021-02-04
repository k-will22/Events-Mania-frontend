import React, { useEffect, useState } from 'react';

function Account({user}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [location, setLocation] = useState("")
    const [favArtists, setFavArtists] = useState("")
    const [favGenres, setFavGenres] = useState("")
    console.log(user)

    const newUser = {
        username: username,
        password: password,
        location: location,
        fav_artists: favArtists,
        fav_genres: favGenres,
        can_verify: true
    }

        const artistSplit = user.fav_artists.toString().split(',')
        const artistTrim = artistSplit.map(a => a.trim())
        const artistList = artistTrim.map(a => {
            return (
            <div>
            <br></br>
            <div>{a} <button>Remove</button></div>
            </div>
            )
        })

        const genreSplit = user.fav_genres.toString().split(',')
        const genreTrim = genreSplit.map(g => g.trim())
        const genreList = genreTrim.map(g => {
            return (
            <div>
            <br></br>
            <div>{g} <button>Remove</button></div>
            </div>
            )
        })

        return (
            <div>
            <h1>{user.username}</h1>
            <h3>Location: {user.location} <button>Change</button></h3>
            <br></br>
            <h3>Favorite Artists: {artistList}</h3>
            <form>
            <label>Add</label>&nbsp;
            <input type="text"></input>&nbsp;
            <input type="submit"></input>
            </form>
            <br></br>
            <h3>Favorite Genres: {genreList}</h3>
            <form>
            <label>Add</label>&nbsp;
            <input type="text"></input>&nbsp;
            <input type="submit"></input>
            </form>
            </div>
        )

}

export default Account