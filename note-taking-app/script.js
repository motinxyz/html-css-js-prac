import { getNotes, saveNotes } from "./utils/storage.js";
import { genId } from "./notes/noteActions.js";
import { createNoteEl } from "./notes/noteFactory.js";

const addNewNoteBtn = document.getElementById("btn-add-new-note");
const appEl = document.getElementById("app");

// load existing nodes
getNotes().forEach((note) => {
  const noteEL = createNoteEl(note.id, note.title, note.content, note.color);
  appEl.insertBefore(noteEL, addNewNoteBtn);
});

addNewNoteBtn.focus();
addNewNoteBtn.addEventListener("click", addNote);

function addNote() {
  const notes = getNotes();

  let container;

  if (
    notes.length !== 0 &&
    notes[notes.length - 1].content === "" &&
    notes[notes.length - 1].title === "" &&
    notes[notes.length - 1].color === "#ffffff"
  ) {
    // The last saved note is empty, so focus its textarea.
    const lastNoteId = notes[notes.length - 1].id;

    // Find the DOM element for that note by its dataset id:
    container = document.querySelector(
      `.note-container[data-id='${lastNoteId}']`
    );
  } else {
    const noteObj = {
      id: genId(),
      title: "",
      content: "",
      color: "#ffffff",
    };

    container = createNoteEl(
      noteObj.id,
      noteObj.title,
      noteObj.content,
      noteObj.color
    );
    appEl.insertBefore(container, addNewNoteBtn);

    notes.push(noteObj);
    saveNotes(notes);
  }

  const textField = container.querySelector("textarea");
  if (textField) textField.focus();
}
