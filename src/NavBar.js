import { Link } from "react-router-dom";

function NavBar({setLoggedIn, setUserId}) {

    function handleLogout() {
        setLoggedIn(false)
    }

    return (
        <div className="navbar">
            <Link to="/main">Events</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="/favorites">Favorites</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="/profile">Profile</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="/recommended">Recommended</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link to="/add">Add Event</Link>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <Link onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default NavBar