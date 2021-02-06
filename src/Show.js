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
        <h2>{event.tour}</h2>
        <h3>Venue: {event.venue}</h3>
        <h3>Date: {event.date}</h3>
        <a target="_blank" href={event.band_page}>Artist Site</a>
        <br></br>
        <br></br>
        <a target="_blank" href={event.venue_page}>Venue Site</a>
        <br></br>
        <br></br>
        <a target="_blank" href={event.ticket_purchase_page}>Purchase Tickets</a>
        </div>
        : null }
        </div>
    )
}

export default Show