import { Link } from "react-router-dom";

function Main({events}) {

  
    const eventList = events.map(e => {
        return (
         <div key={e.id}>
         <Link to={`/show/${e.id}`}>{e.artist.name}</Link>
         <div>Tour: {e.tour}</div>
         <div>Venue: {e.venue}</div>
         <div>Date: {e.date}</div>
         <br></br>
         </div>
        )
      })

      return (
          <div>
            <h1>Events</h1>
            {eventList}
            </div>
      )
}

export default Main