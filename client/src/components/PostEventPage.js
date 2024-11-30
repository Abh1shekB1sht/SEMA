import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostEventPage = () => {
  const [eventDetails, setEventDetails] = useState({
    title: "",
    venue: "",
    timings: "",
    eventStartTime: "",
    registrationEndTime: "",
    organizer: "",
    collegeName: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Post the event data to the backend
      const response = await axios.post('http://localhost:5001/api/events', eventDetails,
      );
      console.log("Event posted successfully", response.data);
      navigate("/"); // Redirect to event list page after successful event creation
    } catch (error) {
      console.error("There was an error posting the event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-2/4">
        <h2 className="text-3xl font-bold text-center mb-4">Post Event</h2>

        <form onSubmit={handleSubmit}>
          {/* Your form fields remain the same */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">Event Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.title}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="venue" className="block text-gray-700">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.venue}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="timings" className="block text-gray-700">Timings</label>
            <input
              type="text"
              id="timings"
              name="timings"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.timings}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="eventStartTime" className="block text-gray-700">Event Start Date</label>
            <input
              type="datetime-local"
              id="eventStartTime"
              name="eventStartTime"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.eventStartTime}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="registrationEndTime" className="block text-gray-700">Registration End Date (Optional)</label>
            <input
              type="datetime-local"
              id="registrationEndTime"
              name="registrationEndTime"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.registrationEndTime}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="organizer" className="block text-gray-700">Organizer</label>
            <input
              type="text"
              id="organizer"
              name="organizer"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.organizer}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="collegeName" className="block text-gray-700">College Name</label>
            <input
              type="text"
              id="collegeName"
              name="collegeName"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.collegeName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">Event Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={eventDetails.image}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostEventPage;
