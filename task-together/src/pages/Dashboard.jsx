// ✅ src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css';

import { useTasks } from '../hooks/useTasks';
import TaskItem from '../components/TaskItem';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [displayName, setDisplayName] = useState('');
  const [userId, setUserId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName || user.email?.split('@')[0] || "Utilisateur");
        setUserId(user.uid);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  const { tasks, addTask, updateTask, deleteTask } = useTasks(userId);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setCreating(false);
  };

  const handleSave = async (data) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
      setEditingTask(null);
    } else {
      await addTask(data);
      setCreating(false);
    }
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
        <div className="flex justify-end mb-6">
          {!creating && !editingTask && (
            <button onClick={() => setCreating(true)} className="cta-button">
              + Nouvelle tâche
            </button>
          )}
        </div>

        {(creating || editingTask) && (
          <div className="mb-6">
            <TaskForm
              initialData={editingTask}
              onSubmit={handleSave}
              onCancel={() => {
                setCreating(false);
                setEditingTask(null);
              }}
            />
          </div>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-6">
          {["A FAIRE", "EN COURS", "TERMINÉ"].map((section, index) => (
            <div key={index} className="task-column">
              <h2>{section}</h2>
              {tasks.filter(t => t.status === section).map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={deleteTask}
                />
              ))}
              {tasks.filter(t => t.status === section).length === 0 && (
                <p className="text-sm text-gray-600 italic">Aucune tâche</p>
              )}
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
