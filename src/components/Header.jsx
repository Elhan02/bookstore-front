import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/publishers">Publishers</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/books/create-book">+ New Book</Link></li>
            </ul>
        </nav>
    )
}

export default Header;