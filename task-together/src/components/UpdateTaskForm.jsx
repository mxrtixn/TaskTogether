import { useState } from 'react';
import TaskForm from './TaskForm';
import { getAuth } from "firebase/auth";
import { deleteTask } from '../services/firestore';
export default function AddTaskForm({ formDatad, onClose, onSubmit }) {
  const [formData, setFormData] = useState(formDatad);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('All values:', formData); 
    onSubmit(formData);
    setFormData({ title: '', description: '', priority: 'None', categorie: 'to-do', dueDate: '' });
    onClose(); // Close after submit
  };
  const handleDelete = async () =>  {
    const auth = getAuth();
    const user = auth.currentUser;
    let taskId = formDatad.taskId;
    if (!user) return;
    try {
      console.log(taskId);
        if (!taskId) ;
        await deleteTask(taskId);
        messageBox("La tâche est supprimer avec success");
        
    } catch (error) {
      messageBox("Erreur lors de la supprision de tâche : " + error);
    }
  };
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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">Modifier une tâche</h2>

        <form className="space-y-4">
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
              onClick={handleDelete}
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-orange-700"
            >
              Supprimer
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              onClick={handleSubmit}
            >
              Modifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
