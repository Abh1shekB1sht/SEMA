import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  const handlePostEvent = (e) => {
    e.preventDefault();

    if (eventTitle && eventDescription) {
      console.log("Event Posted:", { eventTitle, eventDescription });
      // You can integrate API calls to post the event to your database
    } else {
      alert("Please provide all event details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-lg mb-6"
        >
          Logout
        </button>

        <form onSubmit={handlePostEvent}>
          <div className="mb-4">
            <label className="block text-gray-600">Event Title</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600">Event Description</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              placeholder="Enter event description"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          >
            Post Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
