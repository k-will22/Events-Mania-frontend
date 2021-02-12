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
        <br></br>
        {loaded ?
        <div className="event3">
        <br></br>
        {event.photo === "" ? null : <img className="img1" src={event.photo} alt="artist image"></img>}
        <h1>{event.artist.name}</h1>
        <h2>{event.tour}</h2>
        <h3>Venue: {event.venue}</h3>
        <h3>Date: {event.date}</h3>
        {event.band_page === "" ? null : <a target="_blank" rel="noreferrer" href={event.band_page}>Artist Site</a>}
        {event.band_page === "" ? null : <br></br>}
        {event.bank_page === "" ? null : <br></br>}
        {event.venue_page === "" ? null : <a target="_blank" rel="noreferrer" href={event.venue_page}>Venue Site</a>}
        {event.venue_page === "" ? null : <br></br>}
        {event.venue_page === "" ? null : <br></br>}
        {event.ticket_purchase_page === "" ? null : <a target="_blank" rel="noreferrer" href={event.ticket_purchase_page}>Purchase Tickets</a>}
        <br></br>
        <br></br>
        </div>
        : null }
        <br></br>
        </div>
    )
}

export default Show