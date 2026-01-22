import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { authAPI } from '../services/api';
import ParticlesBackground from './ParticlesBackground';

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear message when user starts typing
    if (message.text) setMessage({ text: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      if (isLogin) {
        // Login
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });

        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setMessage({ text: 'Login successful!', type: 'success' });
        console.log('Login successful:', response.data);

        // Clear form inputs
        setFormData({ username: '', email: '', password: '' });

        // Redirect to profile page
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      } else {
        // Register
        const response = await authAPI.register(formData);

        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        setMessage({ text: 'Registration successful!', type: 'success' });
        console.log('Registration successful:', response.data);

        // Clear form inputs
        setFormData({ username: '', email: '', password: '' });

        // Redirect to profile page
        setTimeout(() => {
          navigate('/profile');
        }, 1500);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({ username: '', email: '', password: '' });
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="auth-container">
      <ParticlesBackground />
      <div className={`auth-wrapper ${isLogin ? 'active' : ''}`}>
        {/* Register Form */}
        <div className="auth-form Register">
          <div className="welcome-section animation" style={{ '--i': 0 }}>
            <h1>WELCOME!</h1>
            <p>We're delighted to have you here. If you need any assistance, feel free to reach out.</p>
          </div>
          <div className="form-section animation" style={{ '--i': 1 }}>
            <h2>Register</h2>
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </button>
            </form>
            <p className="toggle-text">
              Don't have an account? <span onClick={toggleForm}>Sign in</span>
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="auth-form Login">
          <div className="form-section animation" style={{ '--i': 0 }}>
            <h2>Login</h2>
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
              <div className="input-group password-group">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p className="toggle-text">
              Don't have an account? <span onClick={toggleForm}>Sign up</span>
            </p>
          </div>
          <div className="welcome-section animation" style={{ '--i': 1 }}>
            <h1>WELCOME BACK!</h1>
            <p>We're delighted to have you here. If you need any assistance, feel free to reach out.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
