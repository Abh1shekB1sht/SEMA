import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaHeart, FaRegHeart } from "react-icons/fa";
import PostEventPage from "./PostEventPage";  

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Initial dummy data for events
    const eventsData = [
      {
        id: 1,
        title: "Tech Fest",
        venue: "College Auditorium",
        timings: "10:00 AM - 5:00 PM",
        organizer: "Tech Club",
        collegeName: "XYZ College",
        status: "upcoming",
        registrationEndTime: new Date("2024-12-12T01:00:00"),
        eventStartTime: new Date("2024-12-15T10:00:00"),
        image: "/images/tech-fest.jpg", // Image for Tech Fest
        likes: 0, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 2,
        title: "Cultural Fest",
        venue: "Main Campus Ground",
        timings: "9:00 AM - 4:00 PM",
        organizer: "Cultural Club",
        collegeName: "XYZ College",
        status: "ongoing",
        registrationEndTime: null,
        eventStartTime: new Date("2024-12-01T15:00:00"),
        image: "/images/cultural-fest.jpg", // Image for Cultural Fest
        likes: 56, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 3,
        title: "Sports Day",
        venue: "College Sports Complex",
        timings: "8:00 AM - 6:00 PM",
        organizer: "Sports Club",
        collegeName: "XYZ College",
        status: "completed",
        // registrationEndTime: new Date("2024-12-12T15:00:00"),
        eventStartTime: new Date("2024-12-18T08:00:00"),
        image: "/images/sports-day.jpg", // Image for Sports Day
        likes: 102, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 4,
        title: "Coding Hackathon",
        venue: "Tech Lab, Main Building",
        timings: "10:00 AM - 4:00 PM",
        organizer: "Code Club",
        collegeName: "ABC College",
        status: "upcoming",
        registrationEndTime: new Date("2024-12-05T12:00:00"),
        eventStartTime: new Date("2024-12-10T10:00:00"),
        image: "/images/coding-hackathon.jpg", // Image for Coding Hackathon
        likes: 0, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 5,
        title: "Art Exhibition",
        venue: "Art Gallery, Building C",
        timings: "11:00 AM - 6:00 PM",
        organizer: "Art Club",
        collegeName: "XYZ College",
        status: "ongoing",
        registrationEndTime: null,
        eventStartTime: new Date("2024-11-30T11:00:00"),
        image: "/images/art-exhibition.jpg", // Image for Art Exhibition
        likes: 29, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 6,
        title: "Startup Pitch Competition",
        venue: "Conference Hall, Block B",
        timings: "9:00 AM - 3:00 PM",
        organizer: "Entrepreneur Club",
        collegeName: "XYZ College",
        status: "upcoming",
        registrationEndTime: new Date("2024-12-08T15:00:00"),
        eventStartTime: new Date("2024-12-14T09:00:00"),
        image: "/images/startup-pitch.jpg", // Image for Startup Pitch Competition
        likes: 0, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 7,
        title: "Music Fest",
        venue: "College Grounds",
        timings: "6:00 PM - 11:00 PM",
        organizer: "Music Club",
        collegeName: "XYZ College",
        status: "completed",
        // registrationEndTime: new Date("2024-11-20T17:00:00"),
        eventStartTime: new Date("2024-11-25T18:00:00"),
        image: "/images/music-fest.jpg", // Image for Music Fest
        likes: 46, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 8,
        title: "Science Symposium",
        venue: "Lecture Hall 2",
        timings: "9:00 AM - 5:00 PM",
        organizer: "Science Club",
        collegeName: "XYZ College",
        status: "upcoming",
        registrationEndTime: new Date("2024-12-20T10:00:00"),
        eventStartTime: new Date("2024-12-25T09:00:00"),
        image: "/images/science-symposium.jpg", // Image for Science Symposium
        likes: 0, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 9,
        title: "Photography Workshop",
        venue: "Creative Arts Room",
        timings: "1:00 PM - 4:00 PM",
        organizer: "Photography Club",
        collegeName: "ABC College",
        status: "ongoing",
        registrationEndTime: null,
        eventStartTime: new Date("2024-11-28T13:00:00"),
        image: "/images/photography-workshop.jpg", // Image for Photography Workshop
        likes: 32, // Like count for Tech Fest
        likedByUser: false,
        },
        {
        id: 10,
        title: "Fashion Show",
        venue: "College Auditorium",
        timings: "5:00 PM - 9:00 PM",
        organizer: "Fashion Club",
        collegeName: "XYZ College",
        status: "completed",
        // registrationEndTime: new Date("2024-11-18T16:00:00"),
        eventStartTime: new Date("2024-11-22T17:00:00"),
        image: "/images/fashion-show.jpg", // Image for Fashion Show
        likes: 19, // Like count for Tech Fest
        likedByUser: false,
        },
    ];

    setEvents(eventsData); 
    setFilteredEvents(eventsData); 
  }, []);

  const openEventDetails = (eventId) => {
    const url = `/event/${eventId}`;
    window.open(url, "_blank"); // This opens the event detail page in a new tab
  };
  

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [
      ...prevEvents,
      {
        ...newEvent,
        id: prevEvents.length + 1,
        status: "upcoming", 
        likes: 0,
        likedByUser: false,
      },
    ]);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    if (status === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(events.filter((event) => event.status === status));
    }
  };

  const calculateEventDaysLeft = (eventStartTime) => {
    const now = new Date();
    const distance = eventStartTime - now;
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      return `${days} days left`;
    } else {
      return "Event Started";
    }
  };

  const handleLike = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              likedByUser: !event.likedByUser,
              likes: event.likedByUser ? event.likes - 1 : event.likes + 1,
            }
          : event
      )
    );
  };

  return (
    <main className="bg-gradient-to-r from-purple-100 to-indigo-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">All Events</h1>

        <div className="text-center mb-12">
          <Link
            to="/post-event"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 px-6 rounded-xl font-bold hover:from-green-500 hover:to-blue-600 transition duration-300"
          >
            Post New Event
          </Link>
        </div>

        {/* Status filter */}
        <div className="flex justify-center mb-6">
          <button
            className={`py-2 px-6 mx-2 rounded-full text-lg font-medium ${statusFilter === "all" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"}`}
            onClick={() => handleStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`py-2 px-6 mx-2 rounded-full text-lg font-medium ${statusFilter === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"}`}
            onClick={() => handleStatusFilter("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`py-2 px-6 mx-2 rounded-full text-lg font-medium ${statusFilter === "ongoing" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"}`}
            onClick={() => handleStatusFilter("ongoing")}
          >
            Ongoing
          </button>
          <button
            className={`py-2 px-6 mx-2 rounded-full text-lg font-medium ${statusFilter === "completed" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"}`}
            onClick={() => handleStatusFilter("completed")}
          >
            Completed
          </button>
        </div>

        {/* Event Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6">
              <img
                src={event.image || "/default-image.jpg"}
                alt={event.title}
                className="w-full h-40 object-cover rounded-xl mb-4 transform hover:scale-105 transition duration-300"
              />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">
                <FaCalendarAlt className="inline mr-2" />
                {event.venue}
              </p>
              <p className="text-gray-600 mb-2">
                <FaClock className="inline mr-2" />
                {event.timings}
              </p>
              <p className="text-gray-600 mb-4">{calculateEventDaysLeft(new Date(event.eventStartTime))}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => openEventDetails(event.id)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 px-4 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleLike(event.id)}
                  className="text-gray-600 hover:text-red-500 transition duration-300"
                >
                  {event.likedByUser ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  {event.likes}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default EventListPage;
