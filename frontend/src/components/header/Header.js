import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="navBar">
        <nav>
            <ul>
                <li><Link to="/">Wszystkie notatki</Link></li>
                <li><Link to="/search">Szukaj po tytule</Link></li>
                <li><Link to="/add">Dodaj nową notatkę</Link></li>
            </ul>
        </nav>
    </div>
  );
}

export default Header;
