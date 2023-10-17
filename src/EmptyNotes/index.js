import React from 'react';
import './EmptyNotes.css';

function EmptyNotes ({searchValue, setSearchValue}){

  //Se guarda el value del input en el state de React
    return(
        <p>
            Crear tus notas...
        </p>
    );
}

export {EmptyNotes};