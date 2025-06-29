import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound';
<<<<<<< Updated upstream
=======

// Composant de routage principal de l'application
>>>>>>> Stashed changes
export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route pour la page d'accueil */}
        <Route path="/" element={<Home />} />
        {/* Route pour la page de connexion */}
        <Route path="/login" element={<Login />} />
        {/* Route pour la page d'inscription */}
        <Route path="/register" element={<Register />} />
        {/* Route protégée pour le tableau de bord */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>} 
        />
        {/* Route pour la page 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
