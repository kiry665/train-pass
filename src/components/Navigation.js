import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './Navigation.css'

const Navigation = ({ isLoggedIn, onLogout }) => {

    const navigate = useNavigate();
    const username = Cookies.get('username');
    const handleLogout = () => {
        onLogout();
        navigate("/")
    };

    return (
        <nav>
        {isLoggedIn ? (
            <div>
                <label className='username-label'>{username}</label>
                <button onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <Link to="/auth">
                <button>Login/Register</button>
            </Link>
        )}
        </nav>
    );
};

export default Navigation;
