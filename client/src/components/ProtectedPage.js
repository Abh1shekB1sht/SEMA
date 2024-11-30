import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <div>Protected Content</div>;
};

export default ProtectedPage;
