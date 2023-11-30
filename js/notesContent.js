export default class notesContent {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            <div class="notes-sidebar">
                <button class="notes-add-button">Add Note</button>
                <div class="notes-list"></div>
            </div>
            <div class="notes-content">
                <input class="notes-content-title" type="text" placeholder="New Note">
                <textarea class="notes-content-body" placeholder="Enter your text"></textarea>
            </div>
        `;

        const addNote = this.root.querySelector(".notes-add-button");
        const inputTitle = this.root.querySelector(".notes-content-title");
        const inputBody = this.root.querySelector(".notes-content-body");

        addNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inputTitle, inputBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inputTitle.value.trim();
                const updatedBody = inputBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);
            });
        });

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="note notes-list-item-selected" data-note-id="${id}">
                <div class="note-title">${title}</div>
                <div class="note-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="note-time">
                    ${updated.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNotesList(notes) {
        const notesList = this.root.querySelector(".notes-list");

        // Empty list
        notesList.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesList.insertAdjacentHTML("beforeend", html);
        }

        notesList.querySelectorAll(".note").forEach(notesListItem => {
            notesListItem.addEventListener("click", () => {
                this.onNoteSelect(notesListItem.dataset.noteId);
            });

            notesListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(notesListItem.dataset.noteId);
                }
            })
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes-content-title").value = note.title;
        this.root.querySelector(".notes-content-body").value = note.body;

        this.root.querySelectorAll(".note").forEach(notesListItem => {
            notesListItem.classList.remove("notes-list-item-selected");
        })

        this.root.querySelector(`.note[data-note-id="${note.id}"]`).classList.add("notes-list-item-selected");

    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes-content").style.visibility = visible ? "visible" : "hidden";
    }
}