import "./notes.css";
import { ChangeEvent, useState } from "react";

export default function Notes() {
  const [newNoteName, setNewNoteName] = useState<string>("");

  function updateNewNoteName(e: ChangeEvent<HTMLInputElement>) {
    setNewNoteName(e.target.value);
    console.log(newNoteName)
  }

  return (
    <div className="notesMainContainer">
      <div className="notesMainTop">
        <div className="newNoteNameContainer">
          <label htmlFor="new-note-input">Enter note name:</label>
          <input
            value={newNoteName}
            type="text"
            id="new-note-input"
            name="new-note-input"
            onChange={updateNewNoteName}
          />
        </div>
        <div className="createNoteBtnContainer">
          <button className="createNoteBtn">Create Note</button>
        </div>
      </div>
    </div>
  );
}
