import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
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

const firebaseConfig = {
  apiKey: "AIzaSyCGerpumjP0QVhO_WkM5Awu43MeqOJcByk",
  authDomain: "practice-3296b.firebaseapp.com",
  projectId: "practice-3296b",
  storageBucket: "practice-3296b.appspot.com",
  messagingSenderId: "278791250657",
  appId: "1:278791250657:web:57ec2fc5ed5c4bf0580da0",
  measurementId: "G-YESYRJXZ2S",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function getAllDocuments() {
  const querySnapshot = await getDocs(collection(db, "userInformation"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
}

function timeout(fn: any, delay: number) {
  setTimeout(() => {});
}

export default function Notes({ borderColor }: NotesProps) {
  const [newNoteName, setNewNoteName] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");
  const [notesArr, setNotesArr] = useState<NotesArrProps[]>([]);

  //Error states
  const [nameError, setNameError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);

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

    if (newNoteName === "" || newNoteName.length < 2) {
      //ADD BETTER ERROR
      setTimeout(() => {
        setNameError(false);
      }, 1200);
      setNameError(true);

      return;
    }

    if (newNoteBody === "" || newNoteBody.length < 2) {
      setTimeout(() => {
        setBodyError(false);
      }, 1200);

      setBodyError(true);
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
          {!nameError && (
            <label htmlFor="new-note-input" className="noteFirstNameLabel">
              Enter note name:
            </label>
          )}
          {nameError && (
            <label
              htmlFor="new-note-input"
              style={{ color: "red", fontSize: "14px", marginBottom: "4px" }}
            >
              Please enter a note name
            </label>
          )}
          <input
            value={newNoteName}
            type="text"
            id="new-note-input"
            name="new-note-input"
            onChange={updateNewNoteName}
          />
        </div>
        <div className="newNoteBodyContainer">
          {!bodyError && (
            <label htmlFor="new-note-body" className="noteFirstBodyLabel">
              Enter note body:
            </label>
          )}
          {bodyError && (
            <label
              className="bodySecondLabel"
              htmlFor="new-note-body"
              style={{ color: "red", fontSize: "14px", marginBottom: "4px" }}
            >
              Please enter a note body
            </label>
          )}
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
