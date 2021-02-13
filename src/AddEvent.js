import React, { useState } from 'react'
import { useHistory } from "react-router-dom";

function AddEvent({genres, events, setEvents}) {
    const [artist, setArtist] = useState("")
    const [artistPage, setArtistPage] = useState("")
    const [genre, setGenre] = useState("")
    const [tour, setTour] = useState("")
    const [location, setLocation] = useState("")
    const [venue, setVenue] = useState("")
    const [venuePage, setVenuePage] = useState("")
    const [date, setDate] = useState("")
    const [ticketPage, setTicketPage] = useState("")
    const [photo, setPhoto] = useState("")
    const history = useHistory()

    const newArtist = {
        name: artist
    }

    function handleAritst(event) {
        setArtist(event.target.value)
    }

    function handleArtistPage(event) {
        setArtistPage(event.target.value)
    }

    function handleGenre(event) {
        setGenre(event.target.value)
    }

    function handleTour(event) {
        setTour(event.target.value)
    }

    function handleLocation(event) {
        setLocation(event.target.value)
    }

    function handleVenue(event) {
        setVenue(event.target.value)
    }

    function handleVenuePage(event) {
        setVenuePage(event.target.value)
    }

    function handleDate(event) {
        setDate(event.target.value)
    }

    function handleTicketPage(event) {
        setTicketPage(event.target.value)
    }

    function handlePhoto(event) {
        setPhoto(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()

        if (genre == 0) {
            return null
        }
        else {
            fetch("http://localhost:3000/artists", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newArtist),
              })
                .then((r) => r.json())
                .then(artistData => {
                    const newArtistId = artistData.id

                    const newEvent = {
                        tour: tour,
                        location: location,
                        venue: venue,
                        venue_page: venuePage,
                        date: date,
                        ticket_purchase_page: ticketPage,
                        photo: photo,
                        band_page: artistPage,
                        artist_id: newArtistId,
                        genre_id: genre,
                        verified: false
                    }

                    fetch("http://localhost:3000/events", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newEvent),
                      })
                        .then((r) => r.json())
                        .then(data => {
                            return setEvents([...events, data])
                        })
                })
        }
                        history.push("/main")
    }


    const genreList = genres.map(g => {
        return <option key={g.id} value={g.id}>{g.name}</option>
    })



    return (
        <div>
        <h1>Add Event</h1>
        <div className="event2">
        <br></br>
        <form onSubmit={handleSubmit}>
            <label>Artist</label>
            <br></br>
            <input className="add" onChange={handleAritst} type="text"></input>
            <br></br>
            <br></br>
            <label>Artist Page</label>
            <br></br>
            <input className="add" onChange={handleArtistPage} type="text"></input>
            <br></br>
            <br></br>
            <label>Genre</label>
            <br></br>
            <select className="add" onChange={handleGenre}>
                <option value="0">ChooseGenre</option>
                {genreList}
            </select>
            <br></br>
            <br></br>
            <label>Tour</label>
            <br></br>
            <input className="add" onChange={handleTour} type="text"></input>
            <br></br>
            <br></br>
            <label>Location</label>
            <br></br>
            <input className="add" onChange={handleLocation} type="text"></input>
            <br></br>
            <br></br>
            <label>Venue</label>
            <br></br>
            <input className="add" onChange={handleVenue} type="text"></input>
            <br></br>
            <br></br>
            <label>Venue Page</label>
            <br></br>
            <input className="add" onChange={handleVenuePage} type="text"></input>
            <br></br>
            <br></br>
            <label>Date</label>
            <br></br>
            <input className="add" onChange={handleDate} type="date"></input>
            <br></br>
            <br></br>
            <label>Ticket Purchase Page</label>
            <br></br>
            <input className="add" onChange={handleTicketPage} type="text"></input>
            <br></br>
            <br></br>
            <label>Photo</label>
            <br></br>
            <input className="add" onChange={handlePhoto} type="text"></input>
            <br></br>
            <br></br>
            <input type="submit"></input>
        </form>
        <br></br>
        </div>
        </div>
    )
}

export default AddEvent