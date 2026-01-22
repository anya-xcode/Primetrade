import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { authAPI } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else {
      // If no user in localStorage, fetch from API
      fetchProfile();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    } catch (err) {
      setError('Failed to load profile. Please login again.');
      console.error('Profile fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
        <button onClick={handleLogout} className="logout-btn">Go to Login</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <h1>Profile</h1>
        </div>
        
        <div className="profile-content">
          <div className="profile-info">
            <div className="info-group">
              <label>Username</label>
              <p>{user?.username}</p>
            </div>
            
            <div className="info-group">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>

            <div className="info-group">
              <label>Role</label>
              <p className="role-badge">{user?.role || 'user'}</p>
            </div>
            
            <div className="info-group">
              <label>User ID</label>
              <p className="user-id">{user?.id}</p>
            </div>
            
            <div className="info-group">
              <label>Member Since</label>
              <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
          
          <div className="profile-actions">
            <button onClick={() => navigate('/tasks')} className="tasks-btn">My Tasks</button>
            <button className="edit-btn">Edit Profile</button>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
