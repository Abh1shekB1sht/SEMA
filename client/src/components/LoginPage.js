import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for error messages
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();  // useNavigate hook for redirection

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault();

    // Reset error messages before validation
    setEmailError('');
    setPasswordError('');

    // Check for empty fields and set error messages
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }
    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    // If form is valid, send the data to backend
    if (valid) {
      axios.post('http://localhost:5001/api/login', { email, password })
        .then((response) => {
          console.log('Login successful:', response.data);

          // Store the JWT token, username, and role in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('role', response.data.role); // Store the role (organizer or user)

          // Redirect to the home page or specific page based on role
          if (response.data.role === 'organizer') {
            navigate('/organizer-dashboard'); // For example, redirect to organizer's dashboard
          } else {
            navigate('/');  // Redirect to general home page for normal users
          }
        })
        .catch((error) => {
          console.error('Error logging in:', error);
          alert('Invalid credentials');
        });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-300 to-purple-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm">
        {/* Logo or Title */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-gray-800">Login</h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
