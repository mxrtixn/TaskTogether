import TaskItem from "./TaskItem";
import { updateTask } from "../services/firestore";
export default function TaskList({tasks, category, setTaskLists}){
    let name = ''
    if (category === 'to-do' || category === 'todo') name = 'A Faire';
        else if (category === 'in-progress' || category === 'progress') name = 'En Cours';
        else if (category === 'done') name = 'Terminé';
        else name = category.charAt(0).toUpperCase() + category.slice(1);

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

        // Get data from the drag event
        const taskId = e.dataTransfer.getData('taskId');
        const sourceColumnId = e.dataTransfer.getData('sourceColumnId');
        const targetColumnId = e.currentTarget.dataset.columnId; // Use data-column-id for target

        // If dropping into the same column or invalid target, do nothing
        if (!taskId || !sourceColumnId || !targetColumnId || sourceColumnId === targetColumnId) {
            return;
        }
    
        // Update the taskLists state
        setTaskLists(async prevTaskLists => {
            const newLists = { ...prevTaskLists };
            
            // Find the task in the source column
            const sourceTasks = newLists[sourceColumnId];
            const taskIndex = sourceTasks.findIndex(task => task.id === taskId);

            if (taskIndex > -1) {
                const [movedTask] = sourceTasks.splice(taskIndex, 1); // Remove from source
                newLists[targetColumnId].push(movedTask); // Add to target
            }

            await updateTask(taskId, {categorie: targetColumnId});
            return newLists; // Return new state to trigger re-render
        });

    };
    
    return <div
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                data-column-id={category} // ID for drag-and-drop targeting
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="bg-gray-200 text-gray-600 rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold mr-2"></span>
                    {name}
                </h2>
                <div className="space-y-4">
                    {/* Get tasks */}

                    {
                        tasks.map(task => {
                            let taskcategorie = '';
                            console.log("taskListe: ", task);
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