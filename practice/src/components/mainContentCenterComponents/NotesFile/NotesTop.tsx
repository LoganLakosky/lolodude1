import NotesMain from "./NotesMain";
import "./notes.css";
import { ChangeEvent, useState } from "react";

type NotesArrProps = {
  name: string;
  body: string;
};

type NotesProps = {
  borderColor: string;
};

export default function Notes({ borderColor }: NotesProps) {
  const [newNoteName, setNewNoteName] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");
  const [notesArr, setNotesArr] = useState<NotesArrProps[]>([]);

  function updateNewNoteName(e: ChangeEvent<HTMLInputElement>) {
    setNewNoteName(e.target.value);
  }

  function updateNewNoteBody(e: ChangeEvent<HTMLInputElement>) {
    setNewNoteBody(e.target.value);
  }

  function createNewNote() {
    if (notesArr.length === 4) {
      alert("Max Notes Reached");
      return;
    }

    if (newNoteName == "" || newNoteName.length < 2) {
      //ADD BETTER ERROR
      alert("Note Name Invalid");
      return;
    }

    if (newNoteBody == "" || newNoteBody.length < 2) {
      //ADD BETTER ERROR
      alert("Note Body Invalid");
      return;
    }

    setNewNoteName("");
    setNewNoteBody("");

    const newNotes: NotesArrProps = {
      name: newNoteName,
      body: newNoteBody,
    };

    setNotesArr((prev) => [...prev, newNotes]);
  }

  function goToNote() {}

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
        <div className="newNoteBodyContainer">
          <label htmlFor="new-note-body">Enter note body:</label>
          <input
            value={newNoteBody}
            type="text"
            id="new-note-body"
            name="new-note-body"
            onChange={updateNewNoteBody}
          />
        </div>
        <div className="createNoteBtnContainer">
          <button className="createNoteBtn" onClick={() => createNewNote()}>
            Create Note
          </button>
        </div>
      </div>
      <div className="notesMainContentContainer">
        <div className="notesContainer">
          {notesArr?.map((item) => {
            return (
              <div
                className="noteContainer"
                style={{ border: `2px solid ${borderColor}` }}
                key={item.body}
              >
                <div className="notesTopContainer">
                  <h2> {item.name}</h2>
                </div>
                <button className="TodoBtn" onClick={() => goToNote()}></button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
