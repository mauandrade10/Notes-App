import React from 'react'
import {NotesIcon} from '../NotesIcon'


//Logica para renderizar el icono de eliminar
function DeleteIcon({onDelete}){
    return(
        <NotesIcon
            type = 'delete'
            color = 'gray'
            onClick = {onDelete}
        />
    );
};

export {DeleteIcon}