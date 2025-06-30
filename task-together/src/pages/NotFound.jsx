import { Link } from 'react-router-dom';
import NavBar from '../components/Navbar';

// Composant NotFound : affiche une page d'erreur 404 personnalisée
const NotFound = () => {
  return (
    <>
      {/* Barre de navigation */}
      <NavBar></NavBar>
      {/* Conteneur principal de la page 404 */}
      <div
        className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 text-gray-800 p-4"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Conteneur interne pour le contenu */}
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          {/* Titre 404 animé */}
          <h1 className="text-6xl font-extrabold text-red-600 mb-4 animate-bounce">
            404
          </h1>
          {/* Sous-titre "Page non trouvée" */}
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">
            Page non trouvée
          </h2>
          {/* Texte descriptif de l'erreur */}
          <p className="text-lg mb-8 leading-relaxed text-gray-600">
            Oups ! La page que vous recherchez a peut-être été supprimée, renommée ou est temporairement indisponible.
          </p>
          {/* Lien vers la page d'accueil */}
          <Link
            to="/"
            className="inline-block bg-orange-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
