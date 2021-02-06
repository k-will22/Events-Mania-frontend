import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Event({e}) {
    const [favorited, setFavorited] = useState(false)
    const [favList, setFavList] = useState([])
    const userId = 1

    useEffect(() => {
        fetch("http://localhost:3000/favorite_events")
        .then(response => response.json())
        .then(setFavList)
    }, [])

    useEffect(() => {
        favList.map(fav => {
        if (fav.event.id === e.id) {
            return setFavorited(true)
        }
        else {
            return null
        }
    })
}, [favList, e])

    function handleFavorite(event) {

        const addFavorite = {
            user_id: userId,
            event_id: event.target.value
        }
    
        fetch("http://localhost:3000/favorite_events", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addFavorite),
          })
            .then((r) => r.json())
            .then(data => {
                console.log(data)
            })
            setFavorited(true)
    }


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
         {favorited ? <div>Favorited</div> :
         <button value={e.id} onClick={handleFavorite}>Favorite</button>}
         <br></br>
         <br></br>
         <hr style={{marginLeft: 500, marginRight: 500}} />
         <br></br>
         </div>
        )
}

export default Event