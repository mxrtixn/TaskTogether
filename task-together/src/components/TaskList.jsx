import TaskItem from "./TaskItem";
import { updateTask } from "../services/firestore";

// Composant pour afficher une colonne de tâches selon la catégorie
export default function TaskList({tasks, category, setTaskLists}){
    // Détermine le nom affiché de la catégorie
    let name = ''
    if (category === 'to-do' || category === 'todo') name = 'A Faire';
        else if (category === 'in-progress' || category === 'progress') name = 'En Cours';
        else if (category === 'done') name = 'Terminé';
        else name = category.charAt(0).toUpperCase() + category.slice(1);

    // Gère l'événement de survol lors du drag & drop
    const handleDragOver = (e) => {
        e.preventDefault(); // Essentiel pour permettre le drop
        // Ajoute un effet visuel lors du survol
        e.currentTarget.classList.add('bg-blue-50', 'border-blue-300');
    };

    // Gère la sortie du survol lors du drag & drop
    const handleDragLeave = (e) => {
        // Retire l'effet visuel
        e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300');
    };
    
    // Gère le drop d'une tâche dans une colonne
    const handleDrop = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('bg-blue-50', 'border-blue-300');

        // Récupère les données de la tâche déplacée
        const taskId = e.dataTransfer.getData('taskId');
        const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
        const targetColumnId = e.currentTarget.dataset.columnId; // Utilise data-column-id pour la cible

        // Si la tâche est déposée dans la même colonne ou cible invalide, ne rien faire
        if (!taskId || !sourceColumnId || !targetColumnId || sourceColumnId === targetColumnId) {
            return;
        }
    
        // Met à jour l'état des listes de tâches
        setTaskLists(async prevTaskLists => {
            const newLists = { ...prevTaskLists };
            
            // Trouve la tâche dans la colonne source
            const sourceTasks = newLists[sourceColumnId];
            const taskIndex = sourceTasks.findIndex(task => task.id === taskId);

            if (taskIndex > -1) {
                const [movedTask] = sourceTasks.splice(taskIndex, 1); // Retire de la source
                newLists[targetColumnId].push(movedTask); // Ajoute à la cible
            }

            await updateTask(taskId, {categorie: targetColumnId});
            return newLists; // Retourne le nouvel état pour déclencher le re-render
        });

    };
    
    // Rendu de la colonne de tâches
    return <div
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                data-column-id={category} // ID pour le drag-and-drop
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-gray-200 text-gray-600 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2"></span>
                    {name}
                </h2>
                <div className="space-y-4">
                    {/* Affiche chaque tâche de la colonne */}
                    {
                        tasks.map(task => {
                            let taskcategorie = '';
                            
                            if (task.categorie === 'to-do' || task.categorie === 'todo') taskcategorie = 'A Faire';
                            else if (task.categorie === 'in-progress' || task.categorie === 'progress') taskcategorie = 'En Cours';
                            else if (task.categorie === 'done') taskcategorie = 'Terminé';
                            else taskcategorie = 'extra';
                            return <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} dueDate={task.dueDate} tag={task.priority} categorie={taskcategorie}/>
                        })
                    }
                </div>
            </div>
}