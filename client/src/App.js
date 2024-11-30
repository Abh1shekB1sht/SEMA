import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import EventHeader from "./components/EventHeader";
import EventFooter from "./components/EventFooter";
import RegistrationPage from "./components/RegistrationPage";
import MainContent from "./components/MainContent";
import EventListPage from "./components/EventList";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import EventDetailsPage from "./components/EventDetailsPage";  
import ProtectedPage from "./components/ProtectedPage";
import PostEventPage from "./components/PostEventPage"; 

function App() {
  const ProtectedAdminRoute = ({ children }) => {
    const role = localStorage.getItem("role");

    if (role !== "admin") {
      return <Navigate to="/" />;
    }

    return children;
  };
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">  {/* Wrap with GoogleOAuthProvider */}
      <Router>
        <EventHeader />
        <Routes>
          <Route path="/" element={<><MainContent /><EventFooter /></>}/>
          <Route path="/home" element={<><MainContent /><EventFooter /></>}/>
          <Route path="/login" element={<><LoginPage /></>}/>
          <Route path="/admindashboard" element={<><AdminDashboard /></>}/>
          <Route path="/events" element={<><EventListPage /></>}/>
          <Route path="/register" element={<><RegistrationPage /></>}/>
          <Route path="/protected" element={<><ProtectedPage /></>}/>

          {/* Add the route for EventDetailsPage with dynamic id */}
          <Route path="/event/:id" element={<EventDetailsPage />} />
          
          {/* This route is for the organizer to post a new event */}
          <Route path="/post-event" element={<PostEventPage />} />
   
          
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>}
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
