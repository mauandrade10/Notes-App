import './CreateNoteButton.css';

function CreateNoteButton({setOpenModal}){
  return(
    <button 
      className="CreateNoteButton"
      onClick={
        () => {
          setOpenModal(state => !state);
        }
      }
    >+</button>
  );
}

export {CreateNoteButton};