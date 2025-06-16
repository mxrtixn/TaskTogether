import { useState } from 'react';

export default function TaskForm({ onSubmit, initialData = {}, onCancel }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    priority: initialData.priority || 'Moyenne',
    status: initialData.status || 'A FAIRE',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white/80 p-4 rounded-lg shadow-md">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Titre"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>Faible</option>
        <option>Moyenne</option>
        <option>Haute</option>
      </select>
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option>A FAIRE</option>
        <option>EN COURS</option>
        <option>TERMINÉ</option>
      </select>
      <div className="flex justify-between">
        <button type="submit" className="cta-button">Enregistrer</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cta-button bg-gray-300 text-black">
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
