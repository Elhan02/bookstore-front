import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link className="nav-link" to="/publishers">Publishers</Link></li>
                <li><Link className="nav-link" to="/books">Books</Link></li>
                <li><Link className="nav-link" to="/add-book">+ New Book</Link></li>
            </ul>
        </nav>
    )
}

export default Header;