import "./notes.css";

export default function Notes() {
  return (
    <div className="notesMainContainer">
      <div className="notesMainTop">
        <div className="newNoteNameContainer">
          <label htmlFor="new-note-input">Enter note name:</label>
          <input type="text" id="new-note-input" name="new-note-input" />
        </div>
        <div className="createNoteBtnContainer">
          <button className="createNoteBtn">Create Note</button>
        </div>
      </div>
    </div>
  );
}
