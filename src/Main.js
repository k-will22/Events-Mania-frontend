import { Link } from "react-router-dom";

function Main({events}) {
    const userId = 3

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
    }

  
    const eventList = events.map(e => {
        return (
         <div key={e.id}>
         <Link to={`/show/${e.id}`}>{e.artist.name}</Link>
         <div>Tour: {e.tour}</div>
         <div>Venue: {e.venue}</div>
         <div>Date: {e.date}</div>
         <button value={e.id} onClick={handleFavorite}>Favorite</button>
         <br></br>
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