
import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';

// The NotFound component displays a custom 404 error page.
// It uses inline styles for a simple, responsive design and includes
// a link back to the homepage.
const NotFound = () => {
  return (<>{/* Navigation Bar */}
      <NavBar></NavBar>
      <div
      // Main container for the 404 page
      className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 text-gray-800 p-4"
      style={{ fontFamily: 'Inter, sans-serif' }} // Using Inter font as per instructions
    >
      

      <div
        // Inner container for content with rounded corners and shadow
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
      >
        <h1
          // Styling for the 404 heading
          className="text-6xl font-extrabold text-red-600 mb-4 animate-bounce"
        >
          404
        </h1>
        <h2
          // Styling for the "Page Not Found" sub-heading
          className="text-3xl font-semibold mb-6 text-gray-700"
        >
          Page Not Found
        </h2>
        <p
          // Descriptive text for the error
          className="text-lg mb-8 leading-relaxed text-gray-600"
        >
          Oops! The page you are looking for might have been removed,
          had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to="/" // Link back to the home page
          // Styling for the "Go to Homepage" button
          className="inline-block bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
    </>
  );
};

export default NotFound; // Export the NotFound component for use in router.jsx
