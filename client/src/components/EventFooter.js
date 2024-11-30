const EventFooter = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">About SEMA</h2>
            <p className="mt-4 text-sm text-gray-400">
              SEMA is your ultimate event management solution. From corporate events to private celebrations, we make it seamless and memorable.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-2xl font-bold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="/home"
                  className="hover:text-yellow-400 transition duration-300 ease-in-out"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="hover:text-yellow-400 transition duration-300 ease-in-out"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-yellow-400 transition duration-300 ease-in-out"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-yellow-400 transition duration-300 ease-in-out"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>Email: contact@sema.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 SEMA Street, City</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-700 pt-6 text-sm text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SEMA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EventFooter;

