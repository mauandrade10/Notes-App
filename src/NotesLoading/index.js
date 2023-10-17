import React from 'react';
import './NotesLoading.css';

function NotesLoading ({searchValue, setSearchValue}){

  //Se guarda el value del input en el state de React
    return(
        <div className="NotesLoading-container">
            <span className="NotesLoading-completeIcon"></span>
            <p className="NotesLoading-text"></p>
            <span className="NotesLoading-deleteIcon"></span>
      </div>
    );
}

export {NotesLoading};