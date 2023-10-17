import {NotesCounter} from '../NotesCounter';
import {NotesSearch} from '../NotesSearch';
import { NotesList } from '../NotesList';
import { NoteElements } from '../NoteElements';
import { CreateNoteButton } from '../CreateNoteButton';
import { NotesLoading } from '../NotesLoading';
import { NotesError } from '../NotesError';
import { EmptyNotes } from '../EmptyNotes'
import { NotesContext } from '../NotesContext';
import { NotesForm } from '../NotesForm';
import {Modal} from '../Modal'
import React from 'react';

function  AppUI (){

  const {
    loading,
    error,
    searchedNotes,
    completeNote,
    deleteNote,
    openModal,
    setOpenModal
  } = React.useContext(NotesContext)
    return(
        <>
        <NotesCounter />
        <NotesSearch />

                      <NotesList>
                      {loading &&  <NotesLoading/>}
                      {error && <NotesError/>}
                      {!loading &&searchedNotes.length === 0 && <EmptyNotes/>}
                      {searchedNotes.map( note =>(
                    <NoteElements 
                      key = {note.text} 
                      text = {note.text} 
                      completed={note.completed}
                      onComplete = {() => completeNote(note.text)}
                      onDelete = {() => deleteNote(note.text)}
                  />)
                    )}
                  </NotesList>
        <CreateNoteButton 
          setOpenModal={setOpenModal}
        />
        {openModal && (<Modal>
          <NotesForm/>
        </Modal>)}
      </>
    )
}

export {AppUI}