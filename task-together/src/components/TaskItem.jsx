export default function TaskItem({ task, onEdit, onDelete }) {
  const priorityColor = task.priority === 'Haute'
    ? 'text-red-500'
    : task.priority === 'Moyenne'
    ? 'text-yellow-600'
    : 'text-green-600';

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className={`text-sm font-medium ${priorityColor}`}>
        Priorité : {task.priority}
      </span>
      <div className="flex gap-2 mt-2">
        <button onClick={() => onEdit(task)} className="cta-button text-xs">Modifier</button>
        <button
          onClick={() => {
            if (confirm("Supprimer cette tâche ?")) onDelete(task.id);
          }}
          className="cta-button text-xs bg-red-500 hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
