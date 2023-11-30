//importing flashcardsContent and flashcardsAPI
import flashcardsContent from "./flashcardsContent.js";
import flashcardsAPI from "./flashcardsAPI.js";

//exporting class flashcardsApp
export default class flashcardsApp {
     constructor(root) {
        this.flashcards = [];
        this.activeFlashcard = null;
        this.content = new flashcardsContent(root, this._handlers());

        this._refreshFlashcards();
     }

   //refreshes the flashcard data
   _refreshFlashcards() {
      const flashcards = flashcardsAPI.getAllFlashcards();

      this._setFlashcards(flashcards);

      if (flashcards.length > 0) {
         this._setActiveFlashcard(flashcards[0]);
      }
   }

   _setFlashcards(flashcards) {
      this.flashcards = flashcards;
      this.content.updateFlashcardsList(flashcards);
      this.content.updateFlashcardPreviewVisibility(flashcards.length > 0);
   }

   _setActiveFlashcard(flashcard) {
      this.activeFlashcard = flashcard;
      this.content.updateActiveFlashcard(flashcard);
   }

   _handlers() {
      return {
         onFlashcardSelect: flashcardId => {
            const selectedFlashcard = this.flashcards.find(flashcard => flashcard.id == flashcardId);
            this._setActiveFlashcard(selectedFlashcard);
         },

         //adds default template to new flashcard
         onFlashcardAdd: () => {
            const newFlashcard = {
               title: "New Flashcard",
               body: "Enter your text"
            };

            flashcardsAPI.saveFlashcard(newFlashcard);

            this._refreshFlashcards();
         },

         //edits flashcard data
         onFlashcardEdit: (title, body) => {
            flashcardsAPI.saveFlashcard({
               id: this.activeFlashcard.id,
               title,
               body
            })

            this._refreshFlashcards();
         },

         onFlashcardDelete: flashcardId => {
            flashcardsAPI.deleteFlashcard(flashcardId);
            
            this._refreshFlashcards();
         }
      };
   }
}