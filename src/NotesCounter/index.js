import './NotesCounter.css'
import React from 'react';
import {NotesContext} from '../NotesContext';


function NotesCounter(){
    const {
      completedNotes,
      totalNotes
    } = React.useContext(NotesContext)
    

    return (
      <>
        {totalNotes === 0 &&(
          <h1 className="NotesCounter">No tienes tareas <br/>¡Agrega una!<br/>Lo puedes hacer desde el +</h1>
        )}
        {totalNotes === completedNotes && totalNotes !== 0 && (
          <h1 className="NotesCounter">¡Felicidades, completaste todos las tareas!</h1>
        )}
        {totalNotes !== completedNotes && (
          <h1 className="NotesCounter">
            <span> {completedNotes} </span>
            Tareas completadas de
            <span> {totalNotes} </span>
          </h1>
        )}
      </>
    );
  }
export {NotesCounter};


