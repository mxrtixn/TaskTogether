import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
export default function Dashboard() {
    const navigate = useNavigate();
    // State for managing the visibility of the user settings dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // Ref to detect clicks outside the dropdown
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

        if (storedEmail) {
        setEmail(storedEmail);
        setDisplayName(name);
        } else {
        // Redirect to login if no data found (optional)
        window.location.href = '/login';
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
    const handleCreateTaskClick = () => {
        // In a real application, this would open a modal or navigate to a task creation page.
        // For demonstration, we'll simulate a modal.
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
                <h3 class="text-lg font-semibold mb-4 text-gray-800">New Task</h3>
                <p class="text-gray-600 mb-6">This button would typically open a form to create a new task!</p>
                <button id="closeMessageBox" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">Got It!</button>
            </div>
        `;
        document.body.appendChild(messageBox);

        // Add event listener to close the simulated message box
        document.getElementById('closeMessageBox').addEventListener('click', () => {
            messageBox.remove();
        });
        console.log('Create New Task button clicked!');
    };

    // Conceptual Drag and Drop Handlers (Frontend only, no state management yet)
    // These functions provide visual feedback for drag-and-drop.
    // For full functionality, you'd need a state management solution (e.g., React Context, Zustand)
    // to update the task lists and re-render components.

    const handleDragStart = (e) => {
        // Set the ID of the dragged task card
        e.dataTransfer.setData('text/plain', e.currentTarget.id);
        e.currentTarget.classList.add('opacity-50'); // Add visual feedback for dragging
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('opacity-50'); // Remove visual feedback after drag ends
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Essential to allow a drop
        // Add visual feedback to the container being dragged over
        e.currentTarget.classList.add('bg-blue-50', 'border-blue-300');
    };

    const handleDragLeave = (e) => {
        // Remove visual feedback from the container
        e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300');
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300');
        const draggedId = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(draggedId);

        if (draggedElement) {
            // Append the dragged element to the new container.
            // In a real app, you would update your state to move the task object
            // from one list to another and let React re-render.
            e.currentTarget.appendChild(draggedElement);
            console.log(`Task ${draggedId} dropped in ${e.currentTarget.id}`);
        }
    };


    return (
        <div className="overflow-x-hidden min-h-screen flex flex-col bg-slate-50">
            <style>
                {`
                body {
                    font-family: 'Inter', sans-serif;
                }
                /* Custom scrollbar for better aesthetics, Notion-like */
                ::-webkit-scrollbar {
                    width: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #F1F5F9; /* bg-slate-100 */
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb {
                    background: #CBD5E1; /* bg-slate-400 */
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #94A3B8; /* bg-slate-500 */
                }
                `}
            </style>
            <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
                {/* Logo and Home Link */}
                <div className="flex items-center space-x-4">
                    <a href="/" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors duration-200">
                        <svg className="h-6 w-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l-7 7m7-7v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        <span className="font-bold text-xl">TaskTogether</span>
                    </a>

                </div>

                {/* User Settings */}
                <div className="relative">
                    <button
                        ref={buttonRef}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center bg-white ring-gray-100 space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2  focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        <img src="https://placehold.co/32x32/A3A3A3/FFFFFF?text=USER" alt="User Avatar" className="h-8 w-8 rounded-full border border-gray-200" />
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
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-md mx-1 my-1">Profile</a>
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
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            <svg className="w-5 h-5 inline-block mr-2 -mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            Ajouter une tâche
                        </button>
                    </div>

                    {/* Task Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* To Do Section */}
                        <div
                            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                            id="todo-tasks" // ID for drag-and-drop targeting
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-gray-200 text-gray-600 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2">3</span>
                                A faire
                            </h2>
                            <div className="space-y-4">
                                {/* Example Task Card */}
                                <div
                                    id={`task-${Math.random().toString(36).substr(2, 9)}`} // Unique ID for drag-and-drop
                                    draggable="true"
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <h3 className="font-medium text-gray-800 mb-1">Plan Q3 Marketing Campaign</h3>
                                    <p className="text-sm text-gray-500">Outline strategies and allocate budget.</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                        <span>Due: July 15</span>
                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full">High Priority</span>
                                    </div>
                                </div>
                                <div
                                    id={`task-${Math.random().toString(36).substr(2, 9)}`} // Unique ID for drag-and-drop
                                    draggable="true"
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <h3 className="font-medium text-gray-800 mb-1">Review Q2 Performance Report</h3>
                                    <p className="text-sm text-gray-500">Analyze data and identify key takeaways.</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                        <span>Due: June 30</span>
                                        <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Medium Priority</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* In Progress Section */}
                        <div
                            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                            id="in-progress-tasks" // ID for drag-and-drop targeting
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-blue-100 text-blue-600 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2">2</span>
                                En Cours
                            </h2>
                            <div className="space-y-4">
                                <div
                                    id={`task-${Math.random().toString(36).substr(2, 9)}`} // Unique ID for drag-and-drop
                                    draggable="true"
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors duration-150"
                                >
                                    <h3 className="font-medium text-gray-800 mb-1">Develop new user onboarding flow</h3>
                                    <p className="text-sm text-gray-500">Working on backend logic and frontend UI.</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                        <span>Est. finish: End of June</span>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">High Priority</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Done Section */}
                        <div
                            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                            id="done-tasks" // ID for drag-and-drop targeting
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                                <span className="bg-green-100 text-green-600 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2">5</span>
                                Terminée
                            </h2>
                            <div className="space-y-4">
                                <div
                                    id={`task-${Math.random().toString(36).substr(2, 9)}`} // Unique ID for drag-and-drop
                                    draggable="true"
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100 opacity-70"
                                >
                                    <h3 className="font-medium text-gray-800 mb-1">Finalize website redesign mockups</h3>
                                    <p className="text-sm text-gray-500">All designs approved and handed off.</p>
                                    <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
                                        <span>Completed: June 10</span>
                                        <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">Archived</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}