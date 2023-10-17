import {AppUI} from './AppUI'
import React from 'react';
import {NotesProvider} from '../NotesContext'

function App() {
      

  return (

      <NotesProvider>
            <AppUI/>  
      </NotesProvider>

  );
}


export default App;
