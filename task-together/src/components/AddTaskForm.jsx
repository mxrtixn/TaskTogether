import { useState } from 'react';
import TaskForm from './TaskForm';

export default function AddTaskForm({ onSubmit, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tag: 'None',
    categorie: 'to-do',
    dueDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // 🔥 Appelle la fonction passée depuis Dashboard
    setFormData({ title: '', description: '', tag: 'None', categorie: 'to-do', dueDate: '' });
    onClose(); // Ferme le formulaire
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-4 text-center text-orange-500">Créer une tâche</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskForm formData={formData} onChange={handleChange} />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
