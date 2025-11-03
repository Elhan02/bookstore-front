import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <nav>
            <ul>
                <li><Link className="nav-link" to="/publishers">Publishers</Link></li>
                <li><Link className="nav-link" to="/books">Books</Link></li>
                {user && <li><Link className="nav-link" to="/add-book">+ New Book</Link></li>}
                {!user && <li><Link className="nav-link" to="/login">Login</Link></li>}
                {user && (
                    <>
                    <li><Link className="nav-link" to="/profile">Profile</Link></li>
                    <LogoutButton />
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Header;