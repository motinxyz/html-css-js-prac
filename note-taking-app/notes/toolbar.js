import { isColorDark } from "../utils/color.js";
import { updateNoteColor, removeNote } from "./noteActions.js";

function createToolbar(container, id, titleField, textArea) {
  const toolbar = document.createElement("div");
  toolbar.classList.add("note-toolbar");

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.classList.add("note-color-picker");
  colorInput.setAttribute("aria-label", "Pick note background color");
  colorInput.value = "#ffffff";
  toolbar.appendChild(colorInput);

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn-note-remove");
  removeBtn.textContent = "Remove";
  removeBtn.setAttribute("aria-label", "Remove Note");
  toolbar.appendChild(removeBtn);

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("btn-note-close");
  closeBtn.textContent = "Close";
  closeBtn.setAttribute("aria-label", "Close note");
  toolbar.appendChild(closeBtn);

  removeBtn.addEventListener("pointerdown", () => {
    console.log("remove button clicked");
    const remove = confirm("Do you really want to remove ''?");
    if (remove) removeNote(id, container);
  });

  closeBtn.addEventListener("pointerdown", () => textArea.blur());

  colorInput.addEventListener("input", () => {
    const color = colorInput.value;
    updateNoteColor(id, color);
    setToolbarTheme(container, titleField, textArea, toolbar, color);
    setToolbarBorder(color, closeBtn, removeBtn, colorInput);
  });

  setToolbarBorder(colorInput.value, closeBtn, removeBtn, colorInput);

  return toolbar;
}

function setToolbarTheme(container, titleField, textArea, toolbar, color) {
  const dark = isColorDark(color);
  container.style.backgroundColor = color;

  titleField.className = `titleField ${dark ? "note-dark" : "note-light"}`;
  textArea.className = `text-field ${dark ? "note-dark" : "note-light"}`;
  toolbar.className = `note-toolbar ${dark ? "toolbar-dark" : "toolbar-light"}`;
}

export function setToolbarBorder(color, closeBtn, removeBtn, colorInput) {
  const dark = isColorDark(color);
  closeBtn.classList.remove("white-border");
  removeBtn.classList.remove("white-border");
  colorInput.classList.remove("white-border");
  closeBtn.classList.remove("none-border");
  removeBtn.classList.remove("none-border");
  colorInput.classList.remove("black-border");
  if (dark) {
    closeBtn.classList.add("white-border");
    removeBtn.classList.add("white-border");
    colorInput.classList.add("white-border");
  } else {
    closeBtn.classList.add("none-border");
    removeBtn.classList.add("none-border");
    colorInput.classList.add("black-border");
  }
}

export { createToolbar, setToolbarTheme };
