import React, { useEffect, useState } from 'react';

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
        <h1>{f.artist.name}</h1>
        <h3>Tour: {f.event.tour}</h3>
        <h3>Venue: {f.event.venue}</h3>
        <h3>Date: {f.event.date}</h3>
        <button value={f.id} onClick={handleUnfavorite}>Unfavorite</button>
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