import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './UserInfo.css';

const UserInfo = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        const storedProfile = sessionStorage.getItem('userProfile');
        if (storedProfile) {
            try {
                setUserProfile(JSON.parse(storedProfile));
            } catch (error) {
                console.error("Failed to parse user profile:", error);
            }
        }
    }, []);

    const handleBack = () => {
        navigate('/chat');
    };

    if (!userProfile) {
        return (
            <div className="user-info-container">
                <div className="glass-panel info-card">
                    <h2>Loading User Information...</h2>
                    <br />
                    <button className="btn-back" onClick={handleBack}>Back to Chat</button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-info-container">
            <div className="glass-panel info-card">
                <div className="info-header">
                    <img src={userProfile.picture} alt="Profile" className="info-avatar" />
                    <h2>{userProfile.name}</h2>
                </div>

                <div className="info-details">
                    <h3>User Claims</h3>
                    <div className="claims-list">
                        {Object.entries(userProfile).map(([key, value]) => (
                            <div key={key} className="claim-item">
                                <span className="claim-key">{key}:</span>
                                <span className="claim-value">{String(value)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="info-actions">
                    <button className="btn-back" onClick={handleBack}>Back to Chat</button>
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
