import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import NotesMain from "./NotesMain";
import "./notes.css";
import { ChangeEvent, useState, useEffect } from "react";

type NotesArr = {
  name: string;
  body: string;
};

type BackupNotesArr = {
  name: string;
  body: string;
};

type NotesProps = {
  borderColor: string;
};

const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//Start of helper functions

function timeout(fn: any, delay: number) {
  setTimeout(() => {
    fn(true);
  }, delay);
}

async function postNote(name: string, body: string) {
  await setDoc(doc(db, "Notes", name), {
    name: name,
    body: body,
  });
}

export default function Notes({ borderColor }: NotesProps) {
  const [newNoteName, setNewNoteName] = useState<string>("");
  const [newNoteBody, setNewNoteBody] = useState<string>("");
  const [notesArr, setNotesArr] = useState<NotesArr[]>([]);

  //Error states
  const [nameError, setNameError] = useState<boolean>(false);
  const [bodyError, setBodyError] = useState<boolean>(false);
  const [backUpNotesArr, setBackupNotesArr] = useState<BackupNotesArr[]>([]);

  useEffect(() => {
    getDocuments();
  }, []);

  //Pass this down
  async function getDocuments() {
    const temp: any = [];

    for (let i = 1; i < 4; i++) {
      const docRef = doc(db, "Notes", `Note${i}`);
      const docSnap = await getDoc(docRef);

      const data = docSnap.data();

      if (data) {
        temp.push(data);
      } else {
        setBackupNotesArr(temp);

        return;
      }
    }
  }

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
      timeout(setNameError, 1200);

      setNameError(true);

      return;
    }

    if (newNoteBody === "" || newNoteBody.length < 2) {
      timeout(setBodyError, 1200);

      setBodyError(true);
      return;
    }

    setNewNoteName("");
    setNewNoteBody("");

    postNote(newNoteName, newNoteBody);
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
          {backUpNotesArr?.map((item) => {
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
