// Dashboard ARTTT - Version Plein Écran Desktop Sans Centrage
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || user.email?.split('@')[0] || "Utilisateur");
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-orange-300 via-white to-orange-200 text-[#3b1d10] font-sans overflow-x-hidden">
      <header className="w-full px-10 py-6 shadow-md flex items-center justify-between backdrop-blur-md bg-white/70 sticky top-0 z-50">
        <h1 className="text-3xl font-extrabold tracking-tight">TASKTOGETHER</h1>
        <div className="flex items-center gap-4">
          <span className="font-semibold hidden sm:block">{displayName}</span>
          <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full shadow">
            Déconnexion
          </button>
        </div>
      </header>

      <main className="p-6 w-full max-w-none">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6">
          {["A FAIRE", "EN COURS", "TERMINÉ"].map((section, index) => (
            <div key={index} className="rounded-xl bg-white/60 backdrop-blur-lg shadow-xl p-6 min-h-[400px] w-full">
              <h2 className="text-xl font-bold mb-4 text-orange-700">{section}</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-all border-l-4 border-orange-400">
                  <h3 className="font-semibold text-lg mb-1">Exemple de Tâche</h3>
                  <p className="text-sm text-gray-700">Description rapide ici</p>
                  <div className="mt-2 text-xs text-orange-600">Priorité : Moyenne</div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="text-center py-4 text-sm text-[#3b1d10] bg-white/50 w-full mt-12">
        © {new Date().getFullYear()} TaskTogether. Tous droits réservés.
      </footer>
    </div>
  );
}
