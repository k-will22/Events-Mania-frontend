import React, { useState} from "react";
import Event from "./Event";

function Main({events, userId, location}) {
    const local = location
    const [searchTerm, setSearchTerm] = useState("")
    const [city, setCity] = useState(local)
    const filterArray = []

    events.map(e => {
        return filterArray.push(e)
    })
    
    function handleSearch(event) {
        setSearchTerm(event.target.value)
    }

    function handleCity(event) {
        if (event.target.value == 0) {
            return setCity(location)
        }
        else {
        return setCity(event.target.value)
        }
    }

    const uniqueSet = new Set(filterArray)
    const uniqueArray = [...uniqueSet]

    const sortedEvents = uniqueArray.sort((a,b) => {
        return a.date.replace(/\D/g, '') - b.date.replace(/\D/g, '')})

    const localEvents = sortedEvents.filter(e => {
        return e.location === city
    })

    const filterEvents = localEvents.filter(e => {
        return e.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const eventList = filterEvents.map(e => {
        return <Event e={e} key={e.id} userId={userId} />
    })
        
      return (
          <div>
            <h1>Events</h1>
            <label>Change Location</label>&nbsp;
            <select onChange={handleCity}>
                <option value="0">Choose Location</option>
                <option value="New York">New York</option>
                <option value="Las Vegas">Las Vegas</option>
                <option value="Miami">Miami</option>
                <option value="Amsterdam">Amsterdam</option>
            </select>
            <br></br>
            <br></br>
            <label>Search by Artist/Genre/Venue</label>&nbsp;
            <input 
                onChange={handleSearch} 
                type="text" 
                autocomplete="off"></input>
            {eventList}
            </div>
      )
}

export default Main