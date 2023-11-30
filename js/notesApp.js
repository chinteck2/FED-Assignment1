//importing notesContent and notesAPI
import notesContent from "./notesContent.js";
import notesAPI from "./notesAPI.js";

//exporting class notesApp
export default class notesApp {
     constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.content = new notesContent(root, this._handlers());

        this._refreshNotes();
     }

   //refreshes the note data
   _refreshNotes() {
      const notes = notesAPI.getAllNotes();

      this._setNotes(notes);

      if (notes.length > 0) {
         this._setActiveNote(notes[0]);
      }
   }

   _setNotes(notes) {
      this.notes = notes;
      this.content.updateNotesList(notes);
      this.content.updateNotePreviewVisibility(notes.length > 0);
   }

   _setActiveNote(note) {
      this.activeNote = note;
      this.content.updateActiveNote(note);
   }

   _handlers() {
      return {
         onNoteSelect: noteId => {
            const selectedNote = this.notes.find(note => note.id == noteId);
            this._setActiveNote(selectedNote);
         },

         //adds default template to new note
         onNoteAdd: () => {
            const newNote = {
               title: "New Note",
               body: "Enter your text"
            };

            notesAPI.saveNote(newNote);

            this._refreshNotes();
         },

         //edits note data
         onNoteEdit: (title, body) => {
            notesAPI.saveNote({
               id: this.activeNote.id,
               title,
               body
            })

            this._refreshNotes();
         },

         onNoteDelete: noteId => {
            notesAPI.deleteNote(noteId);
            
            this._refreshNotes();
         }
      };
   }
}