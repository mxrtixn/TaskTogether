import {useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
export default function ShareDropdown({ currentEmails, anchorRef, onClose, onSave }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState(currentEmails);
  const dropdownWidth = 280; // px

  useEffect(() => {
    

    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();

      let left = rect.left + window.scrollX;
      const rightEdge = left + dropdownWidth;

      // If dropdown will go outside screen, shift it to left
      if (rightEdge > window.innerWidth - 10) {
        left = window.innerWidth - dropdownWidth - 10;
      }

      setPosition({
        top: rect.bottom + window.scrollY + 5,
        left: Math.max(left, 10), // at least 10px from left
      });
    }
  }, [anchorRef]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && emailInput.trim()) {
      e.preventDefault();
      if (validateEmail(emailInput)) {
        if (!emails.includes(emailInput)) {
          setEmails([...emails, emailInput]);
          setEmailInput("");
        }
      } else {
        alert("Invalid email address");
      }
    }
  };

  const validateEmail = (email) =>{
    const auth = getAuth();
    const user = auth.currentUser;
    if (email!=user.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      return true;
    }else{
      return false;
    }
    
  }
    

  const removeEmail = (email) =>
    setEmails(emails.filter((e) => e !== email));

  const handleSave = () => {
    onSave(emails);
    onClose();
  };

  const handleDiscard = () => {
    onClose();
  };

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
      <h3 className="text-sm font-semibold mb-2">Share with email</h3>

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
        placeholder="Type email & press Enter"
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
          Discard
        </button>
        <button
          onClick={handleSave}
          className="text-sm px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}
