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
    onSubmit(formData);
    setFormData({ title: '', description: '', tag: 'None', categorie: 'to-do', dueDate: '' });
    onClose(); // Close after submit
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Créer une tâche</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <TaskForm formData={formData} onChange={handleChange} />

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
