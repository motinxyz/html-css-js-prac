import { createToolbar, setToolbarTheme } from "./toolbar.js";
import {updateTitle, updateContent} from "./noteActions.js"

export function createNoteEl(id, title, content, color) {
  const container = document.createElement("div");
  container.classList.add("note-container");
  container.dataset.id = id;

  const titleField = document.createElement("textarea");
  titleField.classList.add("titleField");
  titleField.placeholder = "(title)";
  titleField.rows = 1;
  titleField.value = title;
  container.appendChild(titleField);

  const textArea = document.createElement("textarea");
  textArea.classList.add("text-field");
  textArea.placeholder = "What's on your mind?";
  textArea.value = content;
  textArea.cols = 30;
  textArea.rows = 10;
  container.appendChild(textArea);

  const toolbar = createToolbar(container, id, titleField, textArea);
  container.appendChild(toolbar);

  setToolbarTheme(container, titleField, textArea, toolbar, color);

  titleField.addEventListener("blur", () => updateTitle(id, titleField.value));

  textArea.addEventListener("input", () => updateContent(id, textArea.value));

  container.addEventListener("dblclick", () => {
    const warning = confirm("Do you really want to remove ''?");
    if (warning) removeNote(id, container);
  });

  return container;
}