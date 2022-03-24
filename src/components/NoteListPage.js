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
import useNotes from '../hooks/useNotes';
import { add, funnel } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';

export default function NoteListPage(props) {
  const history = useHistory();
  const { notes, createNote } = useNotes();
  const activeNotes = notes.filter((note) => note.isArchived !== true);
  const [showActive, setShowActive] = useState(activeNotes);
  const { t } = useTranslation();

  const handleListItemClick = (id) => {
    history.push(`/notes/edit/${id}`);
  };

  const handleNewNoteClick = () => {
    const { id } = createNote();
    history.push(`/notes/edit/${id}`);
  };

  const handleArchiveFilterClick = () => {
    if (showActive === notes) {
      setShowActive(activeNotes);
    } else {
      setShowActive(notes);
    }
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
          <IonTitle>{t('noteListPageTitle')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {showActive.map((note) => {
            return (
              <NoteListItem
                id={note.id}
                key={note.id}
                text={note.text}
                createdAt={note.createdAt}
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
