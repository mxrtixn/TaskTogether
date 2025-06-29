import {useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

// Composant pour afficher un menu déroulant de partage par email
export default function ShareDropdown({ currentEmails, anchorRef, onClose, onSave }) {
  // Position du menu déroulant
  const [position, setPosition] = useState({ top: 0, left: 0 });
  // Champ de saisie de l'email
  const [emailInput, setEmailInput] = useState("");
  // Liste des emails avec lesquels partager
  const [emails, setEmails] = useState(currentEmails);
  const dropdownWidth = 280;

  // Calcule la position du menu déroulant par rapport à l'ancre
  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();

      let left = rect.left + window.scrollX;
      const rightEdge = left + dropdownWidth;

      // Si le menu dépasse l'écran, le décale vers la gauche
      if (rightEdge > window.innerWidth - 10) {
        left = window.innerWidth - dropdownWidth - 10;
      }

      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: Math.max(left, 10), // au moins 10px du bord gauche
      });
    }
  }, [anchorRef]);

  // Ajoute un email à la liste lors de la validation par Entrée
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && emailInput.trim()) {
      e.preventDefault();
      if (validateEmail(emailInput)) {
        if (!emails.includes(emailInput)) {
          setEmails([...emails, emailInput]);
          setEmailInput("");
        }
      } else {
        alert("Adresse email invalide");
      }
    }
  };

  // Valide le format de l'email et empêche d'ajouter son propre email
  const validateEmail = (email) =>{
    const auth = getAuth();
    const user = auth.currentUser;
    if (email!=user.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      return true;
    }else{
      return false;
    }
  }

  // Retire un email de la liste
  const removeEmail = (email) =>
    setEmails(emails.filter((e) => e !== email));

  // Sauvegarde la liste des emails et ferme le menu
  const handleSave = () => {
    onSave(emails);
    onClose();
  };

  // Ferme le menu sans sauvegarder
  const handleDiscard = () => {
    onClose();
  };

  // Rendu du menu déroulant de partage
  return (
    <div
      className="absolute bg-white border rounded-xl shadow-xl p-4 z-[999]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${dropdownWidth}px`,
        maxWidth: "90vw",
      }}
    >
      <h3 className="text-sm font-semibold mb-2">Partager avec Emails</h3>

      <div className="flex flex-wrap gap-2 mb-2">
        {emails.map((email) => (
          <span
            key={email}
            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center"
          >
            {email}
            <button
              onClick={() => removeEmail(email)}
              className="ml-1 text-red-500 hover:text-red-700 font-bold"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <input
        type="text"
        placeholder="Tapez l'e-mail et appuyez sur Entrée"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full border px-2 py-1 rounded mb-3 text-sm"
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={handleDiscard}
          className="text-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Annuler
        </button>
        <button
          onClick={handleSave}
          className="text-sm px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
        >
          Partager
        </button>
      </div>
    </div>
  );
}
