import React, { useState} from "react";
import Event from "./Event";

function Main({events, userId}) {
    const [searchTerm, setSearchTerm] = useState("")
    
    
    function handleSearch(event) {
        setSearchTerm(event.target.value)
    }

    const filterEvents = events.filter(e => {
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