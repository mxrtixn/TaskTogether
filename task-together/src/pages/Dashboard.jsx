import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, signOut } from "firebase/auth";
import TaskList from '../components/TaskList';
import { getUserTasks, getSharedTask } from '../services/firestore';
import AddTaskForm from '../components/AddTaskForm';
import { createTask } from "../services/firestore";

// Composant principal du tableau de bord
export default function Dashboard(){
    const navigate = useNavigate();
    // État pour stocker les tâches par catégorie
    const [tasksByCategory, setTasksByCategory] = useState({});
    // État pour gérer l'ouverture de la fenêtre modale d'ajout de tâche
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Ouvre la fenêtre modale pour créer une nouvelle tâche
    const handleCreateTaskClick = () => {
        setIsModalOpen(true);
    };
    
    // Récupère les tâches de l'utilisateur et les tâches partagées, puis les regroupe par catégorie
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) return;

        const grouped = {
            'to-do': [],
            'in-progress': [],
            'done': []
        };

        let userTasks = [];
        let sharedTasks = [];

        // Fusionne les tâches utilisateur et partagées, puis met à jour l'état
        const mergeAndSet = () => {
            const combined = [...userTasks, ...sharedTasks];
            const groupedCombined = {
                'to-do': [],
                'in-progress': [],
                'done': [],
            };

            combined.forEach(task => {
                let category = task.categorie?.trim().toLowerCase() || 'uncategorized';
                if (!groupedCombined[category]) groupedCombined[category] = [];
                groupedCombined[category].push(task);
            });

            setTasksByCategory(groupedCombined);
        };

        // Abonnement aux tâches de l'utilisateur
        const unsubscribeUser = getUserTasks(user.email, (tasks) => {
            userTasks = tasks;
            mergeAndSet();
        });

        // Abonnement aux tâches partagées
        const unsubscribeShared = getSharedTask(user.email, (tasks) => {
            sharedTasks = tasks;
            mergeAndSet();
        });

        // Nettoyage des abonnements lors du démontage du composant
        return () => {
            unsubscribeUser();
            unsubscribeShared();
        };
    }, []);
    
    // État pour gérer l'ouverture du menu déroulant utilisateur
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Références pour détecter les clics en dehors du menu déroulant
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    // États pour stocker l'email et le nom d'affichage de l'utilisateur
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const auth = getAuth();

    // Déconnecte l'utilisateur et redirige vers la page de connexion
    const handleLogout = async () =>  {
        await signOut(auth);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("displayName")
        sessionStorage.clear();
        navigate('/login');
    };

    // Récupère les informations utilisateur et gère la fermeture du menu déroulant lors d'un clic extérieur
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        const name = localStorage.getItem("displayName");
        if (name == ""){
            window.location.href = '/login';
        }else{
            setEmail(storedEmail);
            setDisplayName(name);
        }
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Affiche une boîte de message personnalisée
    const messageBox = (msg) => {
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                <h3 class="text-lg font-semibold mb-4 text-gray-800">`+msg+`</h3>
                <button id="closeMessageBox" class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">OK</button>
            </div>
        `;
        document.body.appendChild(messageBox);

        document.getElementById('closeMessageBox').addEventListener('click', () => {
            messageBox.remove();
        });
    };

    // Ajoute une nouvelle tâche à la base de données
    const handleAddTask = async (Data) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        try {
            if (Data.categorie === 'A Faire' ) Data.categorie = 'to-do';
              else if (Data.categorie === 'En Cours' ) Data.categorie = 'in-progress';
              else if (Data.categorie === 'Terminé') Data.categorie = 'done';
              else Data.categorie = categorie.charAt(0).toUpperCase() + Data.categorie.slice(1);
            await createTask(user.email, Data);
            messageBox("La tâche est ajoutée avec succès");
        } catch (error) {
            messageBox("Erreur lors de l'ajout de la tâche : " + error);
        }
    };

    // Génère les initiales de l'utilisateur à partir de son nom d'affichage
    let initials;
    try {
        initials = displayName
        .split(" ")
        .filter(word => word.length > 0)
        .slice(0, 2)
        .map(word => word[0].toUpperCase())
        .join(""); 
    }catch (ex){
        initials = 'test';
    };

    // Rendu du composant Dashboard
    return ( 
        <div className="overflow-x-hidden min-h-screen flex flex-col bg-slate-50">
            {/* En-tête avec logo et menu utilisateur */}
            <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        <div className="text-3xl font-extrabold text-orange-500">
                          TaskTogether
                        </div>
                    </a>
                </div>
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center bg-white ring-gray-100 space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <img src={`https://placehold.co/32x32/ff9e00/FFFFFF?text=${initials}`} alt="User Avatar" className="h-8 w-8 rounded-full border border-gray-200" />
                        <span className="font-medium text-gray-700 hidden sm:block">{displayName}</span>
                        <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div
                        ref={dropdownRef}
                        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200 ${isDropdownOpen ? '' : 'hidden'}`}
                    >
                        <hr className="border-t border-gray-200 my-1" />
                        <button onClick={handleLogout} className="block px-4 py-2 bg-white text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-md mx-1 my-1">Déconnecter</button>
                    </div>
                </div>
            </header>
            {/* Section principale avec bouton d'ajout et liste des tâches */}
            <main className="flex-grow p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8 flex justify-center">
                        <button
                            onClick={handleCreateTaskClick}
                            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            <svg className="w-5 h-5 inline-block mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Ajouter une tâche
                        </button>
                    </div>
                    {isModalOpen && <AddTaskForm onSubmit={handleAddTask} onClose={() => setIsModalOpen(false)} />}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(tasksByCategory).map(([category, tasks]) => {
                            return <TaskList key={category} category={category} tasks={tasks} setTaskLists={setTasksByCategory}/>
                        })}
                    </div>
                </div>
            </main>
        </div>);
};