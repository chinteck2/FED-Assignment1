//exporting class flashcardsAPI
export default class flashcardsAPI {
    static getAllFlashcards() { 

        //converts JSON string data into flashcardItem or an empty list and stores in local storage
        const flashcards = JSON.parse(localStorage.getItem("flashcardItem") || "[]");

        //sorts the flashcards by most recently updated
        return flashcards.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    //save flashcard data
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

    //delete flashcard
    static deleteFlashcard(id) {
        const flashcards = flashcardsAPI.getAllFlashcards();
        const newFlashcards =  flashcards.filter(flashcard => flashcard.id != id);

        localStorage.setItem("flashcardItem", JSON.stringify(newFlashcards));
    }
}