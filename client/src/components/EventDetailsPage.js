import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react'; // Import the emoji picker

const EventDetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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

  const username = localStorage.getItem('username');

  useEffect(() => {
    const currentEvent = eventsData.find((event) => event.id === parseInt(id));
    setEvent(currentEvent);
    
    const storedComments = localStorage.getItem(`event-${id}-comments`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    let updatedComments = [...comments];
  
    if (editingCommentIndex !== null) {
      updatedComments[editingCommentIndex].text = comment;
      updatedComments[editingCommentIndex].date = new Date().toLocaleString();
      setEditingCommentIndex(null);
    } else {
      const newComment = {
        text: comment,
        date: new Date().toLocaleString(),
        username,
      };
      updatedComments.push(newComment);
    }
  
    setComments(updatedComments);
    localStorage.setItem(`event-${id}-comments`, JSON.stringify(updatedComments));
    setComment("");
  };

  const handleEmojiClick = (emojiData) => {
    setComment(comment + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleCancelComment = () => {
    setComment("");
    setEditingCommentIndex(null);
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setComment(comments[index].text);
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`event-${id}-comments`, JSON.stringify(updatedComments));
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {event ? (
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-t-lg" />
          <div className="p-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{event.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{event.venue}</p>
            <p className="mt-2 text-sm text-gray-500">{event.timings}</p>
            <p className="mt-2 text-sm text-gray-500">Organizer: {event.organizer}</p>
            <p className="mt-2 text-sm text-gray-500">College: {event.collegeName}</p>

            {/* Event Description */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Event Description</h3>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.
              </p>
            </div>

            {/* Event Speakers/Performers */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Speakers & Performers</h3>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                <li>John Doe - Keynote Speaker</li>
                <li>Jane Smith - Workshop Leader</li>
                <li>Tom Green - Performer</li>
              </ul>
            </div>

            {/* Event Schedule */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Event Schedule</h3>
              <ul className="list-decimal ml-6 mt-2 text-gray-700">
                <li>10:00 AM - Opening Ceremony</li>
                <li>11:00 AM - Tech Talks</li>
                <li>01:00 PM - Lunch Break</li>
                <li>02:00 PM - Panel Discussion</li>
                <li>04:00 PM - Closing Remarks</li>
              </ul>
            </div>

            {/* Registration Details */}
            {event.registrationEndTime && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-900">Registration</h3>
                <p className="mt-2 text-gray-700">
                  Registration ends on {new Date(event.registrationEndTime).toLocaleString()}.
                  <br />
                  <button className="inline-block bg-blue-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-blue-600 transition">
                    Register Now
                  </button>
                </p>
              </div>
            )}

            {/* Event Location Map */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Event Location</h3>
              <p className="mt-2 text-gray-700">Find the event location on the map below:</p>
              <iframe
                title="Event Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.324319801726!2d144.96111361487965!3d-37.81410777975193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6656c8d3097fd%3A0x81c8d89e4c6cc9a9!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1607977032357!5m2!1sen!2sau"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Event Sponsors */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Sponsors</h3>
              <p className="mt-2 text-gray-700">Special thanks to our sponsors:</p>
              <ul className="list-disc ml-6 mt-2 text-gray-700">
                <li>Company A</li>
                <li>Company B</li>
                <li>Company C</li>
              </ul>
            </div>

            {/* Event FAQs */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h3>
              <ul className="mt-2 text-gray-700">
                <li><strong>Q:</strong> Can I attend without registering?<br /><strong>A:</strong> No, you must register before the event.</li>
                <li><strong>Q:</strong> Is lunch provided?<br /><strong>A:</strong> Yes, lunch will be served at 1 PM.</li>
              </ul>
            </div>

            {/* Comment Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Comments</h3>

              {/* Comment Form */}
              {username ? (
                <form onSubmit={handleCommentSubmit}>
                  <div className="flex items-center space-x-3">
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
                      placeholder="Add your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="button"
                      className="text-xl text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      😊
                    </button>
                    {showEmojiPicker && (
                      <div className="absolute z-10 mt-2">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    {editingCommentIndex !== null ? "Update Comment" : "Post Comment"}
                  </button>
                  {editingCommentIndex !== null && (
                    <button
                      type="button"
                      onClick={handleCancelComment}
                      className="mt-2 text-sm text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  )}
                </form>
              ) : (
                <p className="mt-2 text-gray-600">Please log in to comment.</p>
              )}

              {/* Displaying Comments */}
              <div className="mt-6 space-y-4">
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-md bg-gray-50 shadow-sm"
                  >
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-800">{comment.username}</div>
                      <div className="text-xs text-gray-500">{comment.date}</div>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.text}</p>
                    {username === comment.username && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleEditComment(index)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>Loading event details...</p>
        </div>
      )}
    </div>
  );
};

export default EventDetailsPage;
