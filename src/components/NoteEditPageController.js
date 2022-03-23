import React from 'react';
import NoteEditPage from './NoteEditPage';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import useNotes from '../hooks/useNotes';

export default function NoteEditPageController() {
  const { id } = useParams();
  const history = useHistory();
  const { notes, deleteNote, updateNote, archiveNote } = useNotes();
  const selectedNote = notes.find((note) => note.id === id);
  if (!selectedNote) return null;

  //Save Note

  const handleOnSave = (newNoteText) => {
    if (newNoteText === '') {
      deleteNote(id);
      history.goBack();
    } else {
      updateNote(id, newNoteText);
      history.goBack();
    }
  };

  //Archive Note

  const handleSelectedNoteArchive = () => {
    archiveNote(id);
    history.goBack();
  };

  // Delete Note

  const handleOnDelete = () => {
    deleteNote(id);
    history.goBack();
  };

  return (
    <NoteEditPage
      onSave={handleOnSave}
      onDelete={handleOnDelete}
      onArchive={handleSelectedNoteArchive}
      text={selectedNote.text}
    />
  );
}
