import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavBar from '../components/Navbar'
import './styles/Home.css'
import ilustration from '../img/productivity-illustration.png'

// Hero Section Component
const HeroSection = () => (
  <section className="bg-gradient-to-br from-yellow-300 to-orange-500 text-white py-20 px-6 md:py-32 md:px-12 text-center rounded-b-xl shadow-lg w-full">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Organize Your Life, <br className="hidden sm:inline" />Share Your Goals
      </h1>
      <p className="text-lg md:text-xl mb-10 opacity-90">
        TaskTogether is your ultimate partner for effortless task management and seamless collaboration. Get things done, together.
      </p>
      <button className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300">
        Get Started for Free
      </button>
    </div>
  </section>
);

// Features Section Component
const FeaturesSection = () => (
  <section id="features" className="py-16 px-6 md:py-24 md:px-12 bg-white w-full">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
        Why Choose TaskTogether?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Feature 1: Intuitive Task Management */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1">
          <div className="text-orange-500 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l-3 3m0 0l-3-3m3 3V10"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">Intuitive Task Management</h3>
          <p className="text-center text-gray-600">
            Easily create, organize, and track your personal and professional tasks with our clean and user-friendly interface. Stay on top of deadlines and priorities.
          </p>
        </div>

        {/* Feature 2: Seamless Collaboration */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1">
          <div className="text-yellow-500 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-2v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H3M11 10V4m0 0a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-4 12v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">Seamless Collaboration</h3>
          <p className="text-center text-gray-600">
            Share tasks with team members, family, or friends. Assign roles, add comments, and track progress together in real-time.
          </p>
        </div>

        {/* Feature 3: Smart Reminders & Notifications */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1">
          <div className="text-orange-500 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">Smart Reminders & Notifications</h3>
          <p className="text-center text-gray-600">
            Never miss a deadline again. Get timely reminders and notifications for your tasks and shared projects, keeping everyone in the loop.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// How It Works/About Section Component
const HowItWorksSection = () => (
  <section className="py-16 px-6 md:py-24 md:px-12 bg-yellow-50 text-gray-900 w-full">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          Simplifying Your Workflow, One Task at a Time
        </h2>
        <p className="text-lg mb-6 text-gray-700">
          TaskTogether is built with simplicity and efficiency in mind. Our platform helps individuals and teams streamline their daily activities, enhance productivity, and achieve their goals with less effort. Focus on what truly matters.
        </p>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
          <li>Create and assign tasks with ease.</li>
          <li>Collaborate in real-time on shared projects.</li>
          <li>Set deadlines and receive intelligent reminders.</li>
          <li>Monitor progress and celebrate achievements.</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <img src={ilustration} alt="Productivity Illustration" className="w-full h-auto rounded-xl" />
      </div>
    </div>
  </section>
);

// Call to Action Section Component
const CallToActionSection = () => (
  <section className="bg-orange-500 py-20 px-6 md:py-24 md:px-12 text-white text-center rounded-t-xl shadow-lg w-full">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">
        Ready to Boost Your Productivity?
      </h2>
      <p className="text-lg md:text-xl mb-12 opacity-90">
        Join thousands of users who are already simplifying their lives with TaskTogether. It's free to get started!
      </p>
      <button className="bg-yellow-400 text-orange-800 hover:bg-yellow-500 font-bold py-4 px-12 rounded-full text-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
        Start Your Free Trial Today
      </button>
    </div>
  </section>
);

// Footer Section Component
const FooterSection = () => (
  <footer className="bg-gray-800 text-white py-10 px-6 md:px-12 rounded-t-xl w-full">
    <div className="container mx-auto text-center md:flex md:justify-between md:items-center">
      <div className="mb-4 md:mb-0">
        <p>&copy; 2025 TaskTogether. All rights reserved.</p>
      </div>
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Privacy Policy</a>
        <a href="#" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Terms of Service</a>
        <a href="#" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">FAQs</a>
      </div>
    </div>
  </footer>
);

// Scroll to Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Show button after scrolling 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-5 right-5 z-50 bg-orange-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      onClick={scrollToTop}
      title="Go to top"
      aria-label="Scroll to top"
    >
      &#8593; {/* Up arrow character */}
    </button>
  );
};


const Home = () => {
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || user.email?.split('@')[0] || '');
      }
    });
    return () => unsubscribe();
  }, [auth]);

  return (<div className="min-h-screen bg-gray-50 text-gray-800">
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection />
      <FooterSection />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;