import React from 'react';
import './NotesSearch.css';
import {NotesContext} from '../NotesContext'

function NotesSearch (){

  //Se guarda el value del input en el state de React
    
    const {
      searchValue, 
      setSearchValue
    } = React.useContext(NotesContext)
    

    return(
      <input 
        className="NotesSearch" 
        placeholder='Buscar tarea'
        value = {searchValue}
        onChange={
          (event)=>{
            setSearchValue(event.target.value);
          }
        }  
      />
    );
}

export {NotesSearch};