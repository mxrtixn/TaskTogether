// Composant pour le formulaire de création ou modification de tâche
export default function TaskForm({ formData, onChange }) {

  return (<div className="space-y-2 bg-white/80 p-4 rounded-lg ">
      {/* Champ pour le titre de la tâche */}
      <div>
        <p className='text-gray-800 text-sm font-semibold'>  Titre:</p>
        <input
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Titre"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      {/* Champ pour la description de la tâche */}
      <div>
        <p className='text-gray-800 text-sm font-semibold'>  Description:</p>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Champ pour la date d'échéance */}
      <div>
        <p className='text-gray-800 text-sm font-semibold'>  Date d'échéance:</p>
        <input type="date" name="dueDate" 
          value={formData.dueDate}
          onChange={onChange}
          className="w-full mb-3 p-2 border rounded" required />
      </div>
      {/* Sélecteur de priorité */}
      <div>
        <p className='text-gray-800 text-sm font-semibold'>  Périorité:</p>
        <select
          name="priority"
          value={formData.priority}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option>None</option>
          <option>Bas</option>
          <option>Moyenne</option>
          <option>Haute</option>
        </select>
      </div>
      {/* Sélecteur de statut/catégorie */}
      <div>
        <p className='text-gray-800 text-sm font-semibold'>  Statut:</p>
        <select
          name="categorie"
          value={formData.categorie}
          onChange={onChange}
          className="w-full p-2 border rounded"
        >
          <option>A Faire</option>
          <option>En Cours</option>
          <option>Terminé</option>
        </select>
      </div>
    </div>
  );
}
