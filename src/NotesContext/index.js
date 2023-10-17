import React from 'react';
import {useLocaLStorage} from './useLocalStorage'

const NotesContext = React.createContext();

function NotesProvider({children}){

    /*Estados de React
  
  El estado del listado de las notas*/
  const {
    item: notes, 
    saveItem: updateInfo,
    loading,
    error
   } = useLocaLStorage('NOTE_V1', []);
  //Estado del valor del buscador
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  //Calcular la cantidad de notas resueltas
  const completedNotes = notes.filter(
    note => !!note.completed
  ).length;
  
  //Calcular la cantidad de notas 
  const totalNotes = notes.length;

  //Filtrar segun el valor ingresado en el input
  const searchedNotes = notes.filter(
    note => note.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  //Funcion para crear una nota

  const addNotes = (text) => {
    const newList = [...notes];
    newList.push({
      text,
      completed: false,
    });
    updateInfo(newList);
  };

  //Funcion para indicar que una nota está completada
  const completeNote = (text)=>{
    const newList = [...notes];
    const indexNote = newList.findIndex(
      (note) => note.text === text
    );
    if (newList[indexNote].completed === false){
      newList[indexNote].completed = true;
    }else{
      newList[indexNote].completed = false;
    }
    
    updateInfo(newList);
  };

    //Funcion para eliminar una nota
    const deleteNote = (text)=>{
      const newList = [...notes];
      const indexNote = newList.findIndex(
        (note) => note.text === text
      );
      newList.splice(indexNote,1);
      updateInfo(newList);
    };
    
    return (
        <NotesContext.Provider value = {{
            loading,
            error,
            completedNotes,
            totalNotes,
            searchValue,
            setSearchValue,
            searchedNotes,
            completeNote,
            deleteNote,
            openModal, 
            setOpenModal,
            addNotes
        }}>
            {children}
        </NotesContext.Provider>
    );
}


export { NotesContext, NotesProvider}