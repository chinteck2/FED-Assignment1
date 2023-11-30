export default class flashcardsAPI {
    static getAllFlashcards() {
        const flashcards = JSON.parse(localStorage.getItem("flashcardItem") || "[]");

        return flashcards.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveFlashcard(flashcardToSave) {
        const flashcards = flashcardsAPI.getAllFlashcards();
        const existing = flashcards.find(flashcard => flashcard.id == flashcardToSave.id);

        if (existing) {
            existing.title = flashcardToSave.title;
            existing.body = flashcardToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            flashcardToSave.id = Math.floor(Math.random() * 1000000);
            flashcardToSave.updated = new Date().toISOString();
            flashcards.push(flashcardToSave);
        }

        localStorage.setItem("flashcardItem", JSON.stringify(flashcards));
    }

    static deleteFlashcard(id) {
        const flashcards = flashcardsAPI.getAllFlashcards();
        const newFlashcards =  flashcards.filter(flashcard => flashcard.id != id);

        localStorage.setItem("flashcardItem", JSON.stringify(newFlashcards));
    }
}