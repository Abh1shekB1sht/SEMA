import React, { useState, useEffect } from 'react';
import techFestImage from '../assets/tech-fest.jpg';
import culturalFestImage from '../assets/cultural-fest.jpg';
import sportDayImage from '../assets/sports-day.jpg';
import codingChallengeImage from '../assets/coding-challenge.jpg';  // New image
import musicNightImage from '../assets/music-night.jpg';  // New image

const MainContent = () => {
  const [action, setAction] = useState('Organize');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const actions = ['Organize', 'Create', 'Participate'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setShow(false); // Start fading out the word
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % actions.length; // Loop through the actions array
        setAction(actions[currentIndex]); // Update the word displayed
        setShow(true); // Fade the new word in
      }, 500); // Wait for the fade-out to finish before changing the word
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <main className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          {/* Main Heading with animated word replacement */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg">
            <span
              className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}
            >
              {action}
            </span>
            <span className="text-white"> College Events Effortlessly</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200">
            From cultural fests to tech events, we've got you covered. Plan, manage, and enjoy your college events with ease.
          </p>
          <a
            href="register"
            className="mt-8 inline-block bg-yellow-400 text-purple-800 py-3 px-8 rounded-full font-bold hover:bg-yellow-500 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            Register Now
          </a>
        </div>
      </section>

      {/* Featured Events */}
      <section id="events" className="py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900">Upcoming Events</h2>
          <p className="text-lg text-gray-600 mt-2">
            Check out the exciting events happening at our college!
          </p>

          {/* Scrolling Events Container */}
          <div className="mt-12 overflow-hidden relative">
            <div className="flex space-x-6 animate-scroll">
              {/* Tech Fest */}
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  src={techFestImage}
                  alt="Tech Fest"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white rounded-b-lg">
                  <h3 className="text-2xl font-semibold text-gray-900">Tech Fest</h3>
                  <p className="mt-2 text-gray-600">
                    A celebration of innovation and technology with exciting workshops and competitions.
                  </p>
                </div>
              </div>

              {/* Cultural Fest */}
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  src={culturalFestImage}
                  alt="Cultural Fest"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white rounded-b-lg">
                  <h3 className="text-2xl font-semibold text-gray-900">Cultural Fest</h3>
                  <p className="mt-2 text-gray-600">
                    Experience the vibrant culture of our college with performances, art, and dance.
                  </p>
                </div>
              </div>

              {/* Sports Day */}
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  src={sportDayImage}
                  alt="Sports Day"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white rounded-b-lg">
                  <h3 className="text-2xl font-semibold text-gray-900">Sports Day</h3>
                  <p className="mt-2 text-gray-600">
                    Join us for an action-packed day of sports and friendly competition.
                  </p>
                </div>
              </div>

              {/* Coding Challenge */}
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  src={codingChallengeImage}
                  alt="Coding Challenge"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white rounded-b-lg">
                  <h3 className="text-2xl font-semibold text-gray-900">Coding Challenge</h3>
                  <p className="mt-2 text-gray-600">
                    Test your coding skills in this competitive challenge with amazing prizes!
                  </p>
                </div>
              </div>

              {/* Music Night */}
              <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition duration-300">
                <img
                  src={musicNightImage}
                  alt="Music Night"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 bg-white rounded-b-lg">
                  <h3 className="text-2xl font-semibold text-gray-900">Music Night</h3>
                  <p className="mt-2 text-gray-600">
                    A night filled with music, dance, and fun performances. Don't miss out!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Why Choose SEMA?</h2>
          <p className="mt-4 text-gray-600">
            Simplify your event planning process with our comprehensive features and exceptional support.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Effortless Planning", icon: "📅" },
              { title: "Seamless Registration", icon: "📝" },
              { title: "Real-Time Updates", icon: "🔔" },
              { title: "Customizable Events", icon: "🎨" },
              { title: "User-Friendly", icon: "📱" },
              { title: "Collaboration Tools", icon: "🤝" }
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-gray-100 p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="text-4xl text-indigo-600">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-3xl font-bold text-gray-800 text-center">What Students Say</h2>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {["Himesh", "Ashish", "Aman"].map((name, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-8 text-center transform hover:scale-105 transition duration-300 ease-in-out"
              >
                <p className="text-gray-600 italic">
                  "SEMA made our college fest a huge success! Highly recommend their services.”
                </p>
                <h4 className="mt-4 text-gray-800 font-semibold">{name}</h4>
                <p className="text-gray-500">Student, XYZ College</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
