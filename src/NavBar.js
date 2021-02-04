import { Link } from "react-router-dom";

function NavBar() {


    return (
        <div>
            <Link to="/main">Events</Link>&nbsp;
            <Link to="/favorites">Favorites</Link>&nbsp;
            <Link to="/login">Login</Link>
        </div>
    )
}

export default NavBar