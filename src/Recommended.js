import React from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

function Recommended({events, favoriteArtists, favoriteGenres, location}) {
    const filterArray = []

    const cityEvents = events.filter(e => {
        return e.location.toLowerCase() === location.toLowerCase()
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

    const sortedRecos = uniqueArray.sort((a,b) => {
        return a.date.replace(/\D/g, '') - b.date.replace(/\D/g, '')})

    const favArray = sortedRecos.map(e => {
        return (
            <div>
            <div className="event2" key={e.id}>
            <br></br>
            {e.photo === "" ? null : <img className="img1" src={e.photo} alt="artist image"></img>}
            <h3>{e.artist.name}</h3>
            <h4>{e.tour}</h4>
            <div>Location: {e.location}</div>
            <div>Venue: {e.venue}</div>
            <div><Moment format="ddd MMM DD, YYYY">{e.date}</Moment></div>
            <Link to={`/show/${e.id}`}>Event Page</Link>
            <br></br>
            <br></br>
            </div>
            <br></br>
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