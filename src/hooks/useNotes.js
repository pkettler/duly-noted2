import React, { createContext, useContext, useState } from 'react';

const NotesContext = createContext([]);

const reviver = (key, value) => {
  if (key === 'createdAt') {
    return new Date(value);
  }
  return value;
};

const savedNotes = localStorage.getItem('notes');
const initialNotes = savedNotes ? JSON.parse(savedNotes, reviver) : [];

export function NotesProvider(props) {
  const [notes, setNotes] = useState(initialNotes);

  return (
    <NotesContext.Provider value={[notes, setNotes]}>
      {props.children}
    </NotesContext.Provider>
  );
}

export default function useNotes() {
  const [notes, setNotes] = useContext(NotesContext);

  function saveNotes(updatedNotes) {
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }

  return {
    notes,
    createNote() {
      const id = String(notes.length + 1);

      const newNote = {
        id,
        createdAt: new Date(),
        text: '',
        isArchived: false,
      };

      const updatedNotes = [newNote, ...notes];
      saveNotes(updatedNotes);

      return newNote;
    },
    deleteNote(id) {
      const deleteThis = notes.filter((note) => note.id !== id);
      // setNotes(notes.filter((note) => note.id !== id));
      saveNotes(deleteThis);
    },
    archiveNote(id) {
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            isArchived: true,
          };
        }
        return note;
      });
      saveNotes(updatedNotes);
    },
    updateNote(id, updatedNoteText) {
      const updatedNotes = notes.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            text: updatedNoteText,
          };
        }
        return note;
      });
      saveNotes(updatedNotes);
    },
  };
}
