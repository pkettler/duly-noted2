import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonButtons,
} from '@ionic/react';
import PropTypes from 'prop-types';
import NoteListItem from './NoteListItem';
import { useHistory } from 'react-router-dom';
// import useNotes from '../hooks/useNotes';
import { add, funnel } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import { gql, useMutation, useQuery } from '@apollo/client';

export const GET_NOTES = gql`
  {
    notes(includeArchived: true) {
      id
      createdAt
      isArchived
      text
    }
  }
`;

const CREATE_NOTE = gql`
  mutation createNote($note: CreateNoteInput!) {
    createNote(note: $note) {
      id
      createdAt
      isArchived
      text
    }
  }
`;

export default function NoteListPage(props) {
  const [createNote] = useMutation(CREATE_NOTE, {
    onCompleted(data) {
      if (data && data.createNote) {
        const id = data.createNote.id;
        history.push(`/notes/edit/${id}`);
      }
    },
    refetchQueries: [
      {
        query: GET_NOTES,
      },
    ],
  });

  const { data } = useQuery(GET_NOTES, {
    pollInterval: 5000,
  });
  const history = useHistory();
  const [showArchive, setShowArchive] = useState(true);
  const { t } = useTranslation();
  const notes = (data && data.notes) || [];

  // const { createNote } = useNotes();
  // const activeNotes = notes.filter((note) => note.isArchived !== true);

  let filteredNotes;
  if (showArchive) {
    filteredNotes = notes.filter((note) => note.isArchived !== true);
  } else {
    filteredNotes = notes;
  }

  const handleArchiveFilterClick = () => {
    setShowArchive(!showArchive);
  };

  const handleListItemClick = (id) => {
    history.push(`/notes/edit/${id}`);
  };

  const handleNewNoteClick = () => {
    createNote({
      variables: {
        note: {
          text: '',
        },
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="secondary">
            <IonButton color="secondary" onClick={handleArchiveFilterClick}>
              <IonIcon slot="icon-only" icon={funnel} />
            </IonButton>
          </IonButtons>
          <IonTitle class="title">{t('noteListPageTitle')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="note-text">
        <IonList className="note-body">
          {filteredNotes.map((note) => {
            return (
              <NoteListItem
                id={note.id}
                key={note.id}
                text={note.text}
                createdAt={new Date(note.createdAt)}
                isArchived={note.isArchived}
                onClick={handleListItemClick}
              />
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={handleNewNoteClick}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
}

NoteListItem.propTypes = {
  createdAt: PropTypes.instanceOf(Date).isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};
