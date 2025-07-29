const STORAGE_KEY = "notes";

function saveNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function getNotes() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export { saveNotes, getNotes };
