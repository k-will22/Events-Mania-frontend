import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function Favorite() {
    const [favs, setFavs] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/favorite_events")
        .then(response => response.json())
        .then(setFavs)
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
    
    const favList = favs.map(f => {
        return (
        <div key={f.id}>
        <h2>{f.artist.name}</h2>
        <h3>{f.event.tour}</h3>
        <h4>Venue: {f.event.venue}</h4>
        <h4>Date: {f.event.date}</h4>
        <Link to={`/show/${f.event.id}`}>Event Page</Link>
        <br></br>
        <br></br>
        <button value={f.id} onClick={handleUnfavorite}>Unfavorite</button>
        <br></br>
        <br></br>
        <hr style={{marginLeft: 500, marginRight: 500}} />
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