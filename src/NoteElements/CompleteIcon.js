import React from 'react'
import {NotesIcon} from '../NotesIcon'


//Logica para renderizar el icono de completado

function CompleteIcon({completed, onComplete}){
    return(
        <NotesIcon
        type = 'check'
        color = {completed ? 'green' : 'gray'}
        onClick = {onComplete}
    />
    );
};

export {CompleteIcon}