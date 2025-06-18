import { useState } from 'react';

export default function TaskForm({ formData, onChange }) {


  return (
    <div className="space-y-3 bg-white/80 p-4 rounded-lg shadow-md">
      <input
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Titre"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input type="date" name="dueDate" className="w-full mb-3 p-2 border rounded" value={formData.dueDate} required />
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
      <select
        name="status"
        value={formData.status}
        onChange={onChange}
        className="w-full p-2 border rounded"
      >
        <option>A Faire</option>
        <option>En Cours</option>
        <option>Terminé</option>
      </select>
      
    </div>
  );
}