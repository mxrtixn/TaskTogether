export default function TaskItem({ id, title, description, dueDate, tag }) {
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

  return (
    <div
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
  );
}
