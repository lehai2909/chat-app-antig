import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './UserProfileMenu.css';

const UserProfileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    const user = sessionStorage.getItem("user");
    const avatar = sessionStorage.getItem("avatar");

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleAbout = () => {
        navigate('/about');
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/login');
    };

    return (
        <div className="user-profile-menu" ref={menuRef}>
            <div className="profile-trigger" onClick={toggleMenu}>
                {avatar ? (
                    <img src={avatar} alt={user} className="profile-avatar" />
                ) : (
                    <div className="profile-avatar-placeholder">
                        {user ? user[0].toUpperCase() : '?'}
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="profile-dropdown-menu">
                    <div className="menu-header">
                        <span className="menu-username">{user}</span>
                    </div>
                    <div className="menu-divider"></div>
                    <button className="menu-item" onClick={handleAbout}>
                        About
                    </button>
                    <div className="menu-divider"></div>
                    <button className="menu-item logout" onClick={handleLogout}>
                        Log out
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserProfileMenu;
