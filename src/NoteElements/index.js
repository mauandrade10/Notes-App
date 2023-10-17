import {CompleteIcon} from './CompleteIcon'
import {DeleteIcon} from './DeleteIcon'
import './NoteElements.css'

function NoteElements(props){
    return(
      <li className="NotesItem">
        <CompleteIcon 
          completed = {props.completed} 
          onComplete={props.onComplete}
        />

        {/* <span 
          className={`Icon Icon-check ${props.completed && "Icon-check--active"}`}
        >
          V
        </span> */}
        <p className={`NotesItem-p ${props.completed && "NotesItem-p--complete"}`}>
          {props.text}
        </p>

        <DeleteIcon 
          onDelete={props.onDelete}
        />

    </li>
  );
  }

  export {NoteElements}