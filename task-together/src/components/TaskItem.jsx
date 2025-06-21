import UpdateTaskForm from './UpdateTaskForm'
import { useState } from 'react';
import { getAuth } from "firebase/auth";
import { updateTask } from '../services/firestore';
import { data } from 'react-router-dom';
export default function TaskItem({ id, title, description, dueDate, tag, categorie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleUpdateTaskClick = () => {
      setIsModalOpen(true);
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
  const handleUpdateTask = async (Data) => {
          const auth = getAuth();
          const user = auth.currentUser;
          if (!user) return;
          try {
              if (Data.categorie === 'A Faire' ) Data.categorie = 'to-do';
              else if (Data.categorie === 'En Cours' ) Data.categorie = 'in-progress';
              else if (Data.categorie === 'Terminé') Data.categorie = 'done';
              else Data.categorie = categorie.charAt(0).toUpperCase() + Data.categorie.slice(1);
              await updateTask(id, Data);
              messageBox("La tâche est modifier avec success");
          } catch (error) {
              messageBox("Erreur lors de la modification de tâche : " + error);
          }
      };
  const priorityColorBg = tag === 'Haute' ? 'bg-red-100'
    : tag === 'Moyenne' ? 'bg-yellow-100'
    : tag === 'Bas' ? 'bg-green-100'
    : tag === 'None' ? 'bg-gray-200' : '';
  const priorityColorText = tag === 'Haute' ? 'text-red-600'
    : tag === 'Moyenne' ? 'text-yellow-600'
    : tag === 'Bas' ? 'text-green-600'
    : tag === 'None' ? 'text-gray-500' : '';
    
    const handleDragStart = (e) => {
        // Set data for transfer: task ID and the ID of the column it originated from
        e.dataTransfer.setData('taskId', e.currentTarget.id);
        e.dataTransfer.setData('sourceColumnId', e.currentTarget.closest('[data-column-id]').dataset.columnId);
        e.currentTarget.classList.add('opacity-50'); 
    };

    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('opacity-50'); // Remove visual feedback after drag ends
    };
    
  const getDataTask = () => {
    
    return {
      title: title,
      description: description,
      dueDate: dueDate,
      categorie: categorie, 
      priority: tag,
    }
  };
  return (<>
    {isModalOpen && <UpdateTaskForm formDatad={getDataTask} onSubmit={handleUpdateTask} onClose={() => setIsModalOpen(false)} />}
    <div
      onClick={handleUpdateTaskClick}
      id={id}
      key={id} // Unique ID for drag-and-drop
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-orange-50 p-4 rounded-lg shadow-sm border border-orange-100 cursor-grab active:cursor-grabbing hover:bg-orange-100 transition-colors duration-150"
    >
      <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
      <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <span>Due: {dueDate}</span>
          <span className={`px-2 py-0.5 ${priorityColorBg} ${priorityColorText} rounded-full`}>{tag}</span>
      </div>
    </div>
    </>
  );
}
