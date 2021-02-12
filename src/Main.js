import './Main.css';
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Event from "./Event";
import styled from 'styled-components';

function Main({events, userId, location, user, setEvents}) {
    const local = location
    const [searchTerm, setSearchTerm] = useState("")
    const [term, setTerm] = useState("")
    const [city, setCity] = useState(local)
    const [userTerms, setUserTerms] = useState([])
    const filterArray = []

    events.map(e => {
        return filterArray.push(e)
    })
    
    function handleSearch(event) {
        event.preventDefault()

        if (term === "") {
            return setSearchTerm("")
        }
        setSearchTerm(term)

        const termMatch = userTerms.find(t => t == term)

        if (termMatch) {
            return null
        }

        const newTerm = {
            term: term,
            user_id: user.id
        }

        fetch("http://localhost:3000/searched_terms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newTerm),
          })
            .then((r) => r.json())
            .then(createdTerm => {
                setUserTerms([...userTerms, createdTerm.term])
        })
            setTerm("")
    }

    useEffect(() => {
        fetch(`http://localhost:3000/users/${userId}`)
        .then((r) => r.json())
        .then(userInfo => {
           const userSearch = userInfo.searched_terms.map(t => {
               return t.term
           })
           setUserTerms(userSearch)
    })
    }, [userId])

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
        return e.location.toLowerCase() === city.toLowerCase()
    })

    const filterEvents = localEvents.filter(e => {
        return e.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        e.genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const eventList = filterEvents.map(e => {
        return <Event 
            e={e} 
            key={e.id} 
            userId={userId} 
            user={user} 
            events={events} 
            setEvents={setEvents} />
    })

    const cityEvents = sortedEvents.filter(e => {
        return e.location.toLowerCase() === location.toLowerCase()
    })

    const termFilter = cityEvents.filter(e => userTerms.some(t => e.artist.name.toLowerCase() === t.toLowerCase()))
        
    const termEvents = termFilter.map(e => {
        return (
            <div key={e.id}>
            <div className="event">
            <br></br>
            {e.photo === "" ? null : <img className="img2" src={e.photo} alt="artist image"></img>}
            <h3>{e.artist.name}</h3>
            <h4>{e.tour}</h4>
            <div>Location: {e.location}</div>
            <div>Venue: {e.venue}</div>
            <div>Date: {e.date}</div>
            <Link to={`/show/${e.id}`}>Event Page</Link>
            <br></br>
            <br></br>
            </div>
            <br></br>
            </div>
        )
    })
  
      return (
        <div className="one">
          <div>
            <h1>Events</h1>
            <div className="search">
            <label>&nbsp;&nbsp;<strong>Change Location</strong></label>&nbsp;
            <select onChange={handleCity}>
                <option value="0">Choose Location</option>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Austin">Austin</option>
                <option value="Boston">Boston</option>
                <option value="Las Vegas">Las Vegas</option>
                <option value="Miami">Miami</option>
                <option value="Nashville">Nashville</option>
                <option value="New York">New York</option>
            </select>
            <br></br>
            <br></br>
            <form onSubmit={handleSearch} >
            <label><strong>Search by Artist/Genre/Venue</strong></label>&nbsp;
            <input
                onChange={(event) => setTerm(event.target.value)}
                value={term}
                type="text" 
                autoComplete="off"></input>&nbsp;
            <input type="submit"></input>
            </form>
            </div>
            <div className="two">{eventList}</div>
            </div>
            {userTerms == "" || termEvents.length === 0 ? null : <div className="three">
                <h1>Based On Recent Searches</h1>
                <div>{termEvents}</div>
            </div>}
        </div>
      )
}

export default Main