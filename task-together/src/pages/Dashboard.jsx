import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAuth, signOut } from "firebase/auth";
import TaskList from '../components/TaskList';
import { getUserTasks, getSharedTask } from '../services/firestore';
import AddTaskForm from '../components/AddTaskForm';
import { createTask } from "../services/firestore";

export default function Dashboard(){
    const navigate = useNavigate();
    const [tasksByCategory, setTasksByCategory] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateTaskClick = () => {
        setIsModalOpen(true);
    };
    
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

    const unsubscribeUser = getUserTasks(user.email, (tasks) => {
        userTasks = tasks;
        mergeAndSet();
    });

    const unsubscribeShared = getSharedTask(user.email, (tasks) => {
        sharedTasks = tasks;
        mergeAndSet();
    });

    return () => {
        unsubscribeUser();
        unsubscribeShared();
    };
}, []);
    
    // State for managing the visibility of the user settings dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Ref to detect clicks outside the dropdownAdd commentMore actions
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const auth = getAuth();
    const handleLogout = async () =>  {
        // Clear auth data (e.g., token, user info)
        await signOut(auth);
        localStorage.removeItem("userEmail");
        localStorage.removeItem("displayName")
        sessionStorage.clear();
        // Navigate to login
        navigate('/login');
    };
    // Effect to handle clicking outside the dropdown to close it
    useEffect(() => {
        const storedEmail = localStorage.getItem("userEmail");
        const name = localStorage.getItem("displayName");
        // Redirect to login if no data found (optional)
        if (name == ""){
            window.location.href = '/login';
        }else{
            console.log("name : ", name)
            setEmail(storedEmail);
            setDisplayName(name);
        }
        const handleClickOutside = (event) => {
            // Close dropdown if click is outside the dropdown and the button
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
    // Function to handle the "Create New Task" button click
    const messageBox = (msg) => {
        // In a real application, this would open a modal or navigate to a task creation page.
        // For demonstration, we'll simulate a modal.
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                <h3 class="text-lg font-semibold mb-4 text-gray-800">`+msg+`</h3>
                <button id="closeMessageBox" class="bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">OK</button>
            </div>
        `;
        document.body.appendChild(messageBox);

        // Add event listener to close the simulated message box
        document.getElementById('closeMessageBox').addEventListener('click', () => {
            messageBox.remove();
        });
        
    };

    // Conceptual Drag and Drop Handlers (Frontend only, no state management yet)
    // These functions provide visual feedback for drag-and-drop.
    // For full functionality, you'd need a state management solution (e.g., React Context, Zustand)
    // to update the task lists and re-render components.
    const handleAddTask = async (Data) => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;
        try {
            if (Data.categorie === 'A Faire' ) Data.categorie = 'to-do';
              else if (Data.categorie === 'En Cours' ) Data.categorie = 'in-progress';
              else if (Data.categorie === 'Terminé') Data.categorie = 'done';
              else Data.categorie = categorie.charAt(0).toUpperCase() + Data.categorie.slice(1);
            console.log("create: ",Data.categorie);
            await createTask(user.email, Data);
            messageBox("La tâche est ajouter avec success");
        } catch (error) {
            messageBox("Erreur lors de l'ajout de tâche : " + error);
        }
    };
    let initials;
    try {
    initials = displayName
      .split(" ")
      .filter(word => word.length > 0)     // Remove any empty words
      .slice(0, 2)                          // First and last name only
      .map(word => word[0].toUpperCase())  // Get first letter of each
      .join(""); 
    }catch (ex){
        initials = 'test';
    };
                              // Join the letters
  return ( <div className="overflow-x-hidden min-h-screen flex flex-col bg-slate-50">
            
            <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
                {/* Logo and Home Link */}
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        <div className="text-3xl font-extrabold text-orange-500">
                          TaskTogether
                        </div>
                    </a>

                </div>

                {/* User Settings */}
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

                    {/* Dropdown Menu */}
                    <div
                        ref={dropdownRef}
                        className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200 ${isDropdownOpen ? '' : 'hidden'}`}
                    >
                        {/*<a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-md mx-1 my-1">Profile</a>*/}
                        <hr className="border-t border-gray-200 my-1" />
                        <button onClick={handleLogout} className="block px-4 py-2 bg-white text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-md mx-1 my-1">Déconnecter</button>
                    </div>
                </div>
            </header>

            <main className="flex-grow p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Create Task Button */}
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
                    {/* Task Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       
                        {Object.entries(tasksByCategory).map(([category, tasks]) => {
                            return <TaskList key={category} category={category} tasks={tasks} setTaskLists={setTasksByCategory}/>
                        })}
                    </div>
                </div>
            </main>
        </div>);
};