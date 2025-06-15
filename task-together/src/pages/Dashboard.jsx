import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import './styles/Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const auth = getAuth();

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("userEmail");
    localStorage.removeItem("displayName");
    sessionStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedEmail = localStorage.getItem("userEmail");
        const name = localStorage.getItem("displayName");

        setEmail(storedEmail || user.email);
        setDisplayName(name || user.displayName || "Utilisateur");
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCreateTaskClick = () => {
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = `
      <div class="task-modal p-10 rounded-xl max-w-md w-full text-center">
        <h3 class="text-2xl font-bold mb-6 text-5a2a0a">NOUVELLE TÂCHE</h3>
        <p class="text-lg text-5a2a0a mb-8">Cette fonctionnalité permet de créer une nouvelle tâche!</p>
        <button id="closeMessageBox" class="cta-button py-3 px-8 text-lg font-bold">
          COMPRIS!
        </button>
      </div>
    `;
    document.body.appendChild(messageBox);

    document
      .getElementById('closeMessageBox')
      .addEventListener('click', () => {
        messageBox.remove();
      });
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.currentTarget.id);
    e.currentTarget.classList.add('opacity-70');
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('opacity-70');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-orange-100', 'border-orange-300');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-orange-100', 'border-orange-300');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-orange-100', 'border-orange-300');
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);

    if (draggedElement) {
      e.currentTarget.appendChild(draggedElement);
    }
  };

  const generateId = () => `task-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="dashboard-header py-6 px-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center text-5a2a0a hover:text-white transition-colors duration-200">
            <span className="font-bold text-3xl" style={{fontFamily: "'Rubik Mono One', sans-serif"}}>TASKTOGETHER</span>
          </a>
        </div>

        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center bg-white bg-opacity-30 space-x-3 p-3 rounded-xl hover:bg-opacity-50 transition-all duration-200 focus:outline-none"
          >
            <img src="https://placehold.co/40x40/5a2a0a/FFFFFF?text=TT" alt="User Avatar" className="h-10 w-10 rounded-full border-2 border-white" />
            <span className="font-bold text-lg text-[#3b1d10] hidden sm:block">{displayName}</span>
            <svg className={`h-6 w-6 text-5a2a0a transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          <div
            ref={dropdownRef}
            className={`user-dropdown absolute right-0 mt-3 w-56 rounded-xl py-2 z-20 ${isDropdownOpen ? '' : 'hidden'}`}
          >
            <a href="#" className="block px-5 py-3 text-sm font-bold text-5a2a0a hover:bg-orange-100 transition-colors duration-200 rounded-lg mx-2 my-1">
              PROFIL
            </a>
            <hr className="border-t-2 border-orange-200 my-2 mx-3" />
            <button 
              onClick={handleLogout} 
              className="block w-full px-5 py-3 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors duration-200 rounded-lg mx-2 my-1 text-left"
            >
              DÉCONNEXION
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-center">
            <button
              onClick={handleCreateTaskClick}
              className="cta-button py-4 px-10 text-xl"
            >
              <svg className="w-8 h-8 inline-block mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
              </svg>
              AJOUTER UNE TÂCHE
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* To Do Column */}
            <div
              id="todo-tasks"
              className="task-column p-6"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <h2 className="text-2xl font-bold text-5a2a0a mb-6 flex items-center justify-center">
                <span className="bg-white text-orange-600 rounded-full h-10 w-10 flex items-center justify-center text-base font-bold mr-4">3</span>
                À FAIRE
              </h2>
              <div className="space-y-5">
                <div
                  id={generateId()}
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className="task-card p-6 cursor-grab active:cursor-grabbing"
                >
                  <h3 className="font-bold text-xl text-5a2a0a mb-3">PLAN Q3 MARKETING</h3>
                  <p className="text-base text-5a2a0a mb-4">Stratégies et budget à définir</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-5a2a0a">ÉCHÉANCE: 15 JUILLET</span>
                    <span className="px-4 py-1.5 bg-white text-orange-600 rounded-full font-bold">HAUTE PRIORITÉ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* In Progress Column */}
            <div
              id="in-progress-tasks"
              className="task-column p-6"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <h2 className="text-2xl font-bold text-5a2a0a mb-6 flex items-center justify-center">
                <span className="bg-white text-orange-600 rounded-full h-10 w-10 flex items-center justify-center text-base font-bold mr-4">2</span>
                EN COURS
              </h2>
              <div className="space-y-5">
                <div
                  id={generateId()}
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className="task-card p-6 cursor-grab active:cursor-grabbing"
                >
                  <h3 className="font-bold text-xl text-5a2a0a mb-3">ONBOARDING UTILISATEUR</h3>
                  <p className="text-base text-5a2a0a mb-4">Développement backend et UI</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-5a2a0a">FIN ESTIMÉE: FIN JUIN</span>
                    <span className="px-4 py-1.5 bg-white text-orange-600 rounded-full font-bold">URGENT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Done Column */}
            <div
              id="done-tasks"
              className="task-column p-6"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <h2 className="text-2xl font-bold text-5a2a0a mb-6 flex items-center justify-center">
                <span className="bg-white text-orange-600 rounded-full h-10 w-10 flex items-center justify-center text-base font-bold mr-4">5</span>
                TERMINÉ
              </h2>
              <div className="space-y-5">
                <div
                  id={generateId()}
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  className="task-card p-6 opacity-80"
                >
                  <h3 className="font-bold text-xl text-5a2a0a mb-3">REDESIGN WEBSITE</h3>
                  <p className="text-base text-5a2a0a mb-4">Maquettes validées et livrées</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-bold text-5a2a0a">TERMINÉ: 10 JUIN</span>
                    <span className="px-4 py-1.5 bg-white text-orange-600 rounded-full font-bold">ARCHIVÉ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard-footer py-6 text-center">
        <p className="text-base font-bold text-5a2a0a">
          © {new Date().getFullYear()} TASKTOGETHER - TOUS DROITS RÉSERVÉS
        </p>
      </footer>
    </div>
  );
}