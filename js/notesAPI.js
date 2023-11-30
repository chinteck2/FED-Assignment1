//exporting class notesAPI
export default class notesAPI {
    static getAllNotes() {

        //converts JSON string data into noteItem or an empty list and stores in local storage
        const notes = JSON.parse(localStorage.getItem("noteItem") || "[]");


        //sorts the notes by most recently updated
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    //save note data
    static saveNote(noteToSave) {
        const notes = notesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("noteItem", JSON.stringify(notes));
    }

    //delete note
    static deleteNote(id) {
        const notes = notesAPI.getAllNotes();
        const newNotes =  notes.filter(note => note.id != id);

        localStorage.setItem("noteItem", JSON.stringify(newNotes));
    }
}