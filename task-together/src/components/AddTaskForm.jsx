import { useState } from 'react';
import TaskForm from './TaskForm';

// Composant pour afficher le formulaire d'ajout de tâche
export default function AddTaskForm({ onSubmit, onClose }) {
  // État local pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'None',
    categorie: 'A Faire',
    dueDate: '',
  });

  // Met à jour l'état lors d'un changement dans un champ du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Gère la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All values:', formData); 
    onSubmit(formData);
    setFormData({ title: '', description: '', tag: 'None', categorie: 'to-do', dueDate: '' });
    onClose(); // Ferme la fenêtre après la soumission
  };

  // Affiche la fenêtre modale avec le formulaire d'ajout de tâche
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg g w-full max-w-md p-6">
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
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-blue-700"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
