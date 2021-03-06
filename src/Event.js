import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

function Event({e, userId, user, events, setEvents}) {
    const [favorited, setFavorited] = useState(false)
    const [favList, setFavList] = useState([])
    const [verified, setVerified] = useState(false)

    useEffect(() => {
        fetch("http://localhost:3000/favorite_events")
        .then(response => response.json())
        .then(setFavList)
    }, [])

    useEffect(() => {
        if (e.verified) {
            return setVerified(true)
        }
    }, [e])

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

    useEffect(() => {
        if (e.verified) {
            return setVerified(true)
        }
        else {
            return setVerified(false)
     }
    }, [e])

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

    function handleVerify() {

        const verifiedEvent = {
            verified: true
        }

        fetch(`http://localhost:3000/events/${e.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(verifiedEvent),
          })
            .then((r) => r.json())
            .then(data => {
                const newEvents = events.map(e => {
                    if (e.id != data.id) {
                        return e
                    } else {
                        return data
                    }
                })
                console.log(newEvents)
                setEvents(newEvents)
            })
            setVerified(true)
    }

        return (
        <div>
         <div className="event" key={e.id}>
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
         {favorited ? <div>Favorited</div> :
         <button value={e.id} onClick={handleFavorite}>Favorite</button>}
         <br></br>
         <br></br>
        {verified ? <div style={{color: "green"}}>Verified</div> : <div style={{color: "red"}}>Not Verified</div>}
        <br></br>
        {user.can_verify && !verified ? <button onClick={handleVerify}>Verify Event</button> : null}
         <br></br>
         <br></br>
         </div>
         <br></br>
         </div>
        )
}

export default Event