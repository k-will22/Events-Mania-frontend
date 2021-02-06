import React from "react";
import Event from "./Event";

function Main({events}) {
  
    const eventList = events.map(e => {
        return <Event e={e} key={e.id} />
    })
        
      return (
          <div>
            <h1>Events</h1>
            {eventList}
            </div>
      )
}

export default Main