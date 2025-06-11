import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />               {/* Page d'accueil */}
        <Route path="/login" element={<Login />} />         {/* Connexion */}
        <Route path="/register" element={<Register />} />   {/* Inscription */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Tableau de bord */}
      </Routes>
    </BrowserRouter>
  );
}
