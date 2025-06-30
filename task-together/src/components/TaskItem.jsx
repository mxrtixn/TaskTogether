import UpdateTaskForm from './UpdateTaskForm'
import { useState, useRef, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { updateTask } from '../services/firestore';
import { PencilSquareIcon, ShareIcon, XMarkIcon  } from '@heroicons/react/24/solid';
import ShareDropdown from './ShareDropdown';
import { getShareWith, saveShareTasks } from '../services/firestore';

// Composant pour afficher un élément de tâche individuel
export default function TaskItem({ id, title, description, dueDate, tag, categorie }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef(null);
  const [sharedWith, setSharedWith] = useState([]);
  const [isSharedWithMe, setSharedWithMe] = useState(false)
  const auth = getAuth();
  const user = auth.currentUser;

  // Récupère la liste des emails avec lesquels la tâche est partagée
  useEffect(() => {
      getShareWith(id).then((sharedWithList) => {
          setSharedWith(sharedWithList);
      });
      if (sharedWith.includes(user.email)) setSharedWithMe(true);
  });

  // Ouvre la fenêtre de modification de la tâche
  const handleUpdateTaskClick = () => {
    setIsModalOpen(true);
  };

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

        // Ferme la boîte de message au clic sur OK
        document.getElementById('closeMessageBox').addEventListener('click', () => {
            messageBox.remove();
        });
        
    };

  // Gère la mise à jour de la tâche
  const handleUpdateTask = async (Data) => {
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

  // Détermine la couleur de fond selon la priorité
  const priorityColorBg = tag === 'Haute' ? 'bg-red-100'
    : tag === 'Moyenne' ? 'bg-yellow-100'
    : tag === 'Bas' ? 'bg-green-100'
    : tag === 'None' ? 'bg-gray-200' : '';
  // Détermine la couleur du texte selon la priorité
  const priorityColorText = tag === 'Haute' ? 'text-red-600'
    : tag === 'Moyenne' ? 'text-yellow-600'
    : tag === 'Bas' ? 'text-green-600'
    : tag === 'None' ? 'text-gray-500' : '';
    
    // Gère le début du drag & drop
    const handleDragStart = (e) => {
        e.dataTransfer.setData('taskId', e.currentTarget.id);
        e.dataTransfer.setData('sourceColumnId', e.currentTarget.closest('[data-column-id]').dataset.columnId);
        e.currentTarget.classList.add('opacity-50'); 
    };

    // Gère la fin du drag & drop
    const handleDragEnd = (e) => {
        e.currentTarget.classList.remove('opacity-50');
    };
  
  // Récupère les données de la tâche courante
  const getDataTask = () => {
    return {
      taskId: id,
      title: title,
      description: description,
      dueDate: dueDate,
      categorie: categorie, 
      priority: tag,
    }
  };

  // Retire l'email de l'utilisateur courant de la liste de partage
  const removeMyEmail=()=>{
    const sharedWithoutMe = sharedWith.filter(email => email !== user.email);
    handleSaveEmails(sharedWithoutMe);
    setSharedWith( sharedWithoutMe);
    setSharedWithMe(false);
  }

  const [showShare, setShowShare] = useState(false);

  // Sauvegarde la liste des emails avec lesquels la tâche est partagée
  const handleSaveEmails = async (emails) => {
    await saveShareTasks(id, emails)
  };

  // Affichage pour une tâche qui n'est pas partagée avec moi
  if (isSharedWithMe == false)
  return (<>
      {isModalOpen && (
        <UpdateTaskForm
          formDatad={getDataTask()}
          onSubmit={handleUpdateTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div
        id={id}
        key={id}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative bg-orange-50 p-4 rounded-lg shadow-sm border border-orange-100 
                  cursor-grab active:cursor-grabbing hover:bg-orange-100 
                  transition-colors duration-150"
      >
        {/* Boutons d'action en haut à droite */}
        <div className="absolute top-2 right-1 flex gap-1 z-5">
          {/* Bouton de modification */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateTaskClick();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center
                      bg-orange-100 hover:bg-orange-200 text-orange-800"
          >
            <PencilSquareIcon className="w-3 h-3" />
            <span className="sr-only">Edit</span>
          </button>

          {/* Bouton de partage */}
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              setShowShare(!showShare);
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center
                      bg-orange-100 hover:bg-orange-200 text-orange-800"
          >
            <ShareIcon className="w-3 h-3" />
            <span className="sr-only">Share</span>
          </button>
        </div>

        {/* Contenu de la tâche */}
        <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>

        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <span>Due: {dueDate}</span>
          <span
            className={`px-2 py-0.5 ${priorityColorBg} ${priorityColorText} rounded-full`}
          >
            {tag}
          </span>
        </div>
      </div>

      {/* Menu déroulant de partage (affichage conditionnel) */}
      {showShare && (
        <ShareDropdown
          anchorRef={buttonRef}
          currentEmails={() => {
            return sharedWith;
          }}
          onClose={() => setShowShare(false)}
          onSave={handleSaveEmails}
        />
      )}
    </>
  );
  // Affichage pour une tâche partagée avec moi
  else {
    return (<>
      {isModalOpen && (
        <UpdateTaskForm
          formDatad={getDataTask()}
          onSubmit={handleUpdateTask}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <div
        id={id}
        key={id}
        draggable="true"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className="relative bg-yellow-50 p-4 rounded-lg shadow-sm border border-orange-100 
                  cursor-grab active:cursor-grabbing hover:bg-yellow-100 
                  transition-colors duration-150"
      >
        {/* Boutons d'action en haut à droite */}
        <div className="absolute top-2 right-1 flex gap-1 z-5">
          {/* Bouton de modification */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpdateTaskClick();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center
                      bg-yellow-100 hover:bg-yellow-200 text-orange-800"
          >
            <PencilSquareIcon className="w-3 h-3" />
            <span className="sr-only">Edit</span>
          </button>

          {/* Bouton pour retirer mon email du partage */}
          <button
            ref={buttonRef}
            onClick={(e) => {
              e.stopPropagation();
              removeMyEmail();
            }}
            className="w-8 h-8 rounded-full flex items-center justify-center
                      bg-yellow-100 hover:bg-yellow-200 text-yellow-800"
          >
            <XMarkIcon  className="w-3 h-3" />
            <span className="sr-only">Share</span>
          </button>
        </div>

        {/* Contenu de la tâche */}
        <h3 className="font-medium text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>

        <div className="flex justify-between items-center text-xs text-gray-400 mt-2">
          <span> <span>Due: {dueDate} - </span> <span className='text-gray-500 italic'>Partagé avec moi</span></span>
          <span
            className={`px-2 py-0.5 ${priorityColorBg} ${priorityColorText} rounded-full`}
          >
            {tag}
          </span>
        </div>
      </div>
      
    </>);
  }
}