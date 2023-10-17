import React from 'react'
import {ReactComponent as CheckSVG} from './icons/check.svg'
import {ReactComponent as DeleteSVG} from './icons/delete.svg'
import './NotesIcon.css'

//Logica para renderizar el tipo de icono segun la informaci´´on que recibimos en el componente
const iconType ={
    "check" : (color) => <CheckSVG className='Icon-svg' fill={color} />,
    "delete" : (color) => <DeleteSVG className='Icon-svg' fill={color}/>,
}

function NotesIcon ({type, color, onClick}){

    return(
        <span
            className = {`Icon-container Icon-container-${type}`} onClick={onClick}>
                {iconType[type](color)}
        </span>
    )
}

export {NotesIcon}