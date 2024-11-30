import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [successMessage, setSuccessMessage] = useState('');
  const [googleError, setGoogleError] = useState('');
  const navigate = useNavigate();

  // Handle registration form submission
  const handleRegister = (e) => {
    e.preventDefault();

    // Send POST request to the backend for normal registration
    axios.post('http://localhost:5001/api/register', { name, email, password, role })
      .then((response) => {
        setSuccessMessage(response.data.message);
        alert(response.data.message);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');  // Redirect after success
        }, 3000);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        alert('Error during registration. Please try again.');
      });
  };

  // Handle Google login success
  const handleGoogleLogin = (response) => {
    if (response.credential) {
      // Send the token to the backend for Google registration
      axios.post('http://localhost:5001/api/register-google', { token: response.credential })
        .then((response) => {
          setSuccessMessage(response.data.message);
          alert(response.data.message);
          setTimeout(() => {
            setSuccessMessage('');
            navigate('/');  // Redirect after success
          }, 3000);
        })
        .catch((error) => {
          console.error('Error during Google registration:', error);
          setGoogleError('Error during Google registration. Please try again.');
        });
    } else {
      setGoogleError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h2>

        {/* Success message */}
        {successMessage && (
          <div className="text-center text-green-500 mb-4">{successMessage}</div>
        )}

        {/* Google error message */}
        {googleError && (
          <div className="text-center text-red-500 mb-4">{googleError}</div>
        )}

        <form onSubmit={handleRegister}>
          {/* Name Input */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-lg text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label htmlFor="role" className="block text-lg text-gray-700 font-medium">Role</label>
            <select
              id="role"
              className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out"
          >
            Register
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6 text-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log('Login Failed')}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 focus:ring-4 focus:ring-red-300 transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
