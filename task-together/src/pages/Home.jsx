import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar'
import './styles/Home.css'
import ilustration from '../img/productivity-illustration.png';


// Hero Section Component
const HeroSection = ({onClick}) => (
  <section className="bg-gradient-to-br from-yellow-300 to-orange-500 text-white py-20 px-6 md:py-32 md:px-12 text-center rounded-b-xl shadow-lg w-full">
    <div className="container mx-auto max-w-4xl">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
        Organisez votre vie, <br className="hidden sm:inline" />Partagez vos objectifs
      </h1>
      <p className="text-lg md:text-xl mb-10 opacity-90">
        TaskTogether est votre partenaire idéal pour une gestion des tâches simplifiée et une collaboration fluide. Agissez ensemble.      </p>
      <button onClick={onClick} className="bg-white text-orange-500 hover:bg-gray-100 font-bold py-4 px-10 rounded-full text-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300">
        Commencez gratuitement
      </button>
    </div>
  </section>
);

// Features Section Component
const FeaturesSection = () => (
  <section id="features" className="py-16 px-6 md:py-24 md:px-12 bg-white w-full">
    <div className="container mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
        Pourquoi choisir TaskTogether ?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {/* Feature 1: Intuitive Task Management */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1">
          <div className="text-orange-500 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7l-3 3m0 0l-3-3m3 3V10"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">Gestion Intuitive des Tâches</h3>
          <p className="text-center text-gray-600">
            Créez, organisez et suivez facilement vos tâches personnelles et professionnelles grâce à notre interface claire et intuitive. Maîtrisez vos échéances et vos priorités.
          </p>
        </div>

        {/* Feature 2: Seamless Collaboration */}
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border border-gray-100 transform hover:-translate-y-1">
          <div className="text-yellow-500 mb-4 flex justify-center">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h-2v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2H3M11 10V4m0 0a2 2 0 100 4 2 2 0 000-4zm7 0a2 2 0 100 4 2 2 0 000-4zm-4 12v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-center mb-4 text-gray-900">Collaboration Transparente</h3>
          <p className="text-center text-gray-600">
            Partagez des tâches avec vos collègues, votre famille ou vos amis. Attribuez des tâches, mettez-les à jour et suivez leur progression ensemble en temps réel.
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
          Simplifiez votre flux de travail, une tâche à la fois
        </h2>
        <p className="text-lg mb-6 text-gray-700">
          TaskTogether a été conçu pour allier simplicité et efficacité. Notre plateforme aide les individus et les équipes à rationaliser leurs activités quotidiennes, à améliorer leur productivité et à atteindre leurs objectifs avec moins d'effort. Concentrez-vous sur l'essentiel.
        </p>
        <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
          <li>Créez et attribuez des tâches en toute simplicité.</li>
          <li>Collaborez en temps réel sur des tâche partagés.</li>
          <li>Suivez les progrès et célébrez les réussites.</li>
        </ul>
      </div>
      <div className="md:w-1/2">
        <img src={ilustration} alt="Illustration de productivité" className="w-full h-auto rounded-xl" />
      </div>
    </div>
  </section>
);

// Call to Action Section Component
const CallToActionSection = ({onClick}) => (
  <section className="bg-orange-500 py-20 px-6 md:py-24 md:px-12 text-white text-center rounded-t-xl shadow-lg w-full">
    <div className="container mx-auto max-w-3xl">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">
        Prêt à booster votre productivité ?
      </h2>
      <p className="text-lg md:text-xl mb-12 opacity-90">
        Rejoignez des milliers d’utilisateurs qui simplifient déjà leur quotidien avec TaskTogether. Commencez gratuitement !
      </p>
      <button onClick={onClick} className="bg-yellow-400 text-orange-800 hover:bg-yellow-500 font-bold py-4 px-12 rounded-full text-xl shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300">
        Commencez votre essai gratuit dès aujourd’hui
      </button>
    </div>
  </section>
);

// Footer Section Component
const FooterSection = () => (
  <footer className="bg-gray-800 text-white py-10 px-6 md:px-12 rounded-t-xl w-full">
    <div className="container mx-auto text-center md:flex md:justify-between md:items-center">
      <div className="mb-4 md:mb-0">
        <p>&copy; 2025 TaskTogether. Tous droits réservés.</p>
      </div>
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Politique de confidentialité</a>
        <a href="#" className="text-gray-300 hover:text-white transition duration-300 ease-in-out">Conditions d'utilisation</a>
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
  const navigate = useNavigate();
  const onregisterClick=()=>{
     navigate('/register');
  };
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
      <HeroSection onClick={onregisterClick}/>
      <FeaturesSection />
      <HowItWorksSection />
      <CallToActionSection onClick={onregisterClick}/>
      <FooterSection />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;