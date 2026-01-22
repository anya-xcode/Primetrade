import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import './Admin.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchAllUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const response = await adminAPI.getAllUsers();
      
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        setError('Failed to fetch users');
      }
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is logged in and is admin
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token) {
      navigate('/');
      return;
    }
    
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        setLoading(false);
        return;
      }
    }
    
    fetchAllUsers();
  }, [navigate, fetchAllUsers]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <button onClick={handleBack} className="back-button">
        ← Back
      </button>
      
      <div className="admin-header">
        <h1>Admin - All Users</h1>
        <p>Total Users: {users.length}</p>
      </div>

      {error && <div className="error">{error}</div>}

      {!error && users.length === 0 ? (
        <div className="no-users">No users found.</div>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password (Hashed)</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className="password-cell">{user.password}</td>
                <td>{formatDate(user.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;
