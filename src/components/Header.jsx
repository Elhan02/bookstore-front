import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";
import LogoutButton from "./LogoutButton";

const Header = () => {
    const { user } = useContext(UserContext);
    return (
        <nav>
            <ul>
                {user?.role === "Editor" && (<>
                <li><Link className="nav-link" to="/volumes">Volumes</Link></li>
                <li><Link className="nav-link" to="/issues">Issues</Link></li>
                </>)}
                <li><Link className="nav-link" to="/authors">Authors</Link></li>
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