import { getNotes, saveNotes } from "../utils/storage.js";

export function genId() {
  const notes = getNotes();
  const firstNote = notes.length === 0;

  if (firstNote) return 1001;

  return notes[notes.length - 1].id + 1;
}

export function updateContent(id, updatedContent) {
  const notes = getNotes();
  const note = notes.find((n) => n.id === id);

  if (note) {
    note.content = updatedContent;
    saveNotes(notes);
  } else {
    console.error(`Note with Id = ${id} could not found!`);
  }
}

export function updateTitle(id, updatedTitle) {
  const notes = getNotes();
  const note = notes.find((note) => note.id === id);

  if (note) {
    note.title = updatedTitle;
    saveNotes(notes);
  } else {
    console.error(`Note with Id = ${id} could not found!`);
  }
}
export function updateNoteColor(id, updatedColor) {
  const notes = getNotes();
  const note = notes.find((note) => note.id === id);

  if (note) {
    note.color = updatedColor;
    saveNotes(notes);
  } else {
    console.error(`Note with Id = ${id} could not found!`);
  }
}

export function removeNote(id, container) {
  const notes = getNotes();
  const ind = notes.findIndex((note) => note.id === id);
  const ifExist = ind !== -1;

  if (ifExist) {
    notes.splice(ind, 1);
    saveNotes(notes);
    container.classList.add("note--vanishing");
    setTimeout(() => {
      try {
        // appEl.removeChild(element);
        container.remove();
      } catch (error) {
        console.log("Error while removing node: " + `${error.message}`);
      }
    }, 300);
  } else {
    console.log(`Node with id ${id} does not exist!`);
  }
}
