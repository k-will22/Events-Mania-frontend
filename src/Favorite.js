import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Favorite({userId}) {
    const [favs, setFavs] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/favorite_events")
        .then(response => response.json())
        .then(data => {
            const filteredFav = data.filter(d => {
                return d.user.id == userId
            })
            setFavs(filteredFav)
        })
    }, [])

    function handleUnfavorite(event) {
        const favId = event.target.value

        fetch(`http://localhost:3000/favorite_events/${favId}`, {
        method: "DELETE",
    })
        .then (r=> r.json())
        .then(data => {
            console.log(data)
        })

        const removeFav = favs.filter(f => f.id != favId)
        setFavs(removeFav)
        
    }

    const sortedFavs = favs.sort((a,b) => {
            return a.event.date.replace(/\D/g, '') - b.event.date.replace(/\D/g, '')})
    
    const favList = sortedFavs.map(f => {
        return (
        <div>
        <div className="event2" key={f.id}>
        <br></br>
        {f.event.photo == "" ? null : <img className="img1" src={f.event.photo} alt="artist image"></img>}
        <h2>{f.artist.name}</h2>
        <h3>{f.event.tour}</h3>
        <h4>Location: {f.event.location}</h4>
        <h4>Venue: {f.event.venue}</h4>
        <h4>Date: {f.event.date}</h4>
        <Link to={`/show/${f.event.id}`}>Event Page</Link>
        <br></br>
        <br></br>
        <button className="red" value={f.id} onClick={handleUnfavorite}>Unfavorite</button>
        <br></br>
        <br></br>
        </div>
        <br></br>
        </div>
        )
    })

    return (
        <div>
        <h1>Favorite Events</h1>
        {favList}
        </div>
    )
}

export default Favorite