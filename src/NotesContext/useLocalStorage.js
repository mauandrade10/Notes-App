import React from 'react';

function useLocaLStorage(itemName, initialValue){

    const [item, setItem] = React.useState(initialValue);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);


    
    React.useEffect(()=>{
        setTimeout(()=>{
            try{
                const localStorageNotes = localStorage.getItem(itemName);
      
                let parsedNotes;
        
                if(!localStorageNotes){
                    localStorage.setItem(itemName, JSON.stringify(initialValue));
                    parsedNotes = initialValue; 
                  }else{
                    parsedNotes = JSON.parse(localStorageNotes); 
                    setItem(parsedNotes);   
                  }
        
                  setLoading(false);
            }catch(error){
                setLoading(false);
                setError(true);
            }
        },2000);
    }, []);
  
    const saveItem  = (newList)=>{
      localStorage.setItem(itemName, JSON.stringify(newList));
      setItem(newList);
    };
  
    return {
        item, 
        saveItem,
        loading,
        error
    };    
  }
  
  export {useLocaLStorage};

  // localStorage.deleteItem('NOTES_V1',defaultElements)
// const defaultElements = [
//   {text:'Llorar con la Llorona', completed:true},
//   {text:'Cortar cebolla', completed:true},
//   {text:'Sacar a Alaska', completed:true},
//   {text:'Terminar el proyecto', completed:false},
// ];

// localStorage.setItem('NOTE_V1',JSON.stringify(defaultElements))

