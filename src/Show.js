import React, { useEffect, useState } from 'react';

function Show() {
const [event, setEvent] = useState([])
const [loaded, setLoaded] = useState(false)

let url = window.location.pathname.split('/')
let id = url[2]

useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
    .then(response => response.json())
    .then(data => {
        setEvent(data)
        setLoaded(true)
    })
    }, [id])


    return (
        <div>
        {loaded ?
        <div>
        <h1>{event.artist.name}</h1>
        <h3>Tour: {event.tour}</h3>
        <h3>Venue: {event.venue}</h3>
        <h3>Date: {event.date}</h3>
        </div>
        : null }
        </div>
    )
}

export default Show