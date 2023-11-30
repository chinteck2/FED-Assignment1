export default class flashcardsContent {
    constructor(root, { onFlashcardSelect, onFlashcardAdd, onFlashcardEdit, onFlashcardDelete } = {}) {
        this.root = root;
        this.onFlashcardSelect = onFlashcardSelect;
        this.onFlashcardAdd = onFlashcardAdd;
        this.onFlashcardEdit = onFlashcardEdit;
        this.onFlashcardDelete = onFlashcardDelete;
        this.root.innerHTML = `
            <div class="flashcards-sidebar">
                <button class="flashcards-add-button">Add Flashcard</button>
                <div class="flashcards-list"></div>
            </div>
            <div class="flashcards-content">
                <div class="flashcards-text">
                    <input class="flashcards-content-title" type="text" placeholder="New Flashcard">
                    <textarea class="flashcards-content-body" placeholder="Enter the answer"></textarea>
                </div>
            </div>
        `;

        const addFlashcard = this.root.querySelector(".flashcards-add-button");
        const inputTitle = this.root.querySelector(".flashcards-content-title");
        const inputBody = this.root.querySelector(".flashcards-content-body");

        addFlashcard.addEventListener("click", () => {
            this.onFlashcardAdd();
        });

        [inputTitle, inputBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inputTitle.value.trim();
                const updatedBody = inputBody.value.trim();

                this.onFlashcardEdit(updatedTitle, updatedBody);
            });
        });

        this.updateFlashcardPreviewVisibility(false);
    }

    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="flashcard flashcards-list-item-selected" data-flashcard-id="${id}">
                <div class="flashcard-title">${title}</div>
                <div class="flashcard-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="flashcard-time">
                    ${updated.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateFlashcardsList(flashcards) {
        const flashcardsList = this.root.querySelector(".flashcards-list");

        // Empty list
        flashcardsList.innerHTML = "";

        for (const flashcard of flashcards) {
            const html = this._createListItemHTML(flashcard.id, flashcard.title, flashcard.body, new Date(flashcard.updated));

            flashcardsList.insertAdjacentHTML("beforeend", html);
        }

        flashcardsList.querySelectorAll(".flashcard").forEach(flashcardsListItem => {
            flashcardsListItem.addEventListener("click", () => {
                this.onFlashcardSelect(flashcardsListItem.dataset.flashcardId);
            });

            flashcardsListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this flashcard?");

                if (doDelete) {
                    this.onFlashcardDelete(flashcardsListItem.dataset.flashcardId);
                }
            })
        });
    }

    updateActiveFlashcard(flashcard) {
        this.root.querySelector(".flashcards-content-title").value = flashcard.title;
        this.root.querySelector(".flashcards-content-body").value = flashcard.body;

        this.root.querySelectorAll(".flashcard").forEach(flashcardsListItem => {
            flashcardsListItem.classList.remove("flashcards-list-item-selected");
        })

        this.root.querySelector(`.flashcard[data-flashcard-id="${flashcard.id}"]`).classList.add("flashcards-list-item-selected");

    }

    updateFlashcardPreviewVisibility(visible) {
        this.root.querySelector(".flashcards-content").style.visibility = visible ? "visible" : "hidden";
    }
}