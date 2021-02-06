import React from "react";
import { Link } from "react-router-dom";

function Recommended({events, favoriteArtists, favoriteGenres, user}) {
    const filterArray = []

    const cityEvents = events.filter(e => {
        return e.location === user.location
    })

    const favArt = cityEvents.filter(e => favoriteArtists.some(a => e.artist.id === a.artist.id))
    const favGen = cityEvents.filter(e => favoriteGenres.some(g => e.genre.id === g.genre.id))

    favArt.map(artist => {
        return filterArray.push(artist)
    })
    favGen.map(genre => {
        return filterArray.push(genre)
    })

    const uniqueSet = new Set(filterArray)
    const uniqueArray = [...uniqueSet]

    const favArray = uniqueArray.map(e => {
        return (
            <div key={e.id}>
            <h3>{e.artist.name}</h3>
            <div>{e.tour}</div>
            <br></br>
            <div>Venue: {e.venue}</div>
            <div>Date: {e.date}</div>
            <Link to={`/show/${e.id}`}>Event Page</Link>
            <br></br>
            <br></br>
            <hr style={{marginLeft: 500, marginRight: 500}} />
            </div>
        )
    })

    return (
        <div>
            <h1>Recommended Events</h1>
            {favArray}
        </div>
    )

}

export default Recommended