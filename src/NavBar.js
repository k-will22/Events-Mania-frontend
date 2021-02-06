import { Link } from "react-router-dom";

function NavBar({setLoggedIn}) {

    function handleLogout() {
        setLoggedIn(false)
    }

    return (
        <div>
            <Link to="/main">Events</Link>&nbsp;
            <Link to="/favorites">Favorites</Link>&nbsp;
            <Link to="/profile">Profile</Link>&nbsp;
            <Link to="/recommended">Recommended</Link>&nbsp;
            <Link to="/add">Add Event</Link>&nbsp;
            <Link onClick={handleLogout}>Logout</Link>
        </div>
    )
}

export default NavBar