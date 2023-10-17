import React from 'react';
import { NotesContext } from '../NotesContext';
import './NotesForm.css';

function NotesForm() {
  const {
    addNotes,
    setOpenModal,
  } = React.useContext(NotesContext);
  const [newNoteValue, setNewNoteValue] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    addNotes(newNoteValue);
    setOpenModal(false);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onChange = (event) => {
    setNewNoteValue(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Escribe tu nueva nota</label>
      <textarea
        placeholder="Nueva nota"
        value={newNoteValue}
        onChange={onChange}
      />
      <div className="NoteForm-buttonContainer">
        <button
          type="button"
          className="NoteForm-button NoteForm-button--cancel"
          onClick={onCancel}
        >Cancelar</button>
        <button
          type="submit"
          className="NoteForm-button NoteForm-button--add"
        >Añadir</button>
      </div>
    </form>
  );
}

export { NotesForm };