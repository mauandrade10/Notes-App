import './NotesList.css'


function NotesList(props){
    return(
        <ul className="NotesList">
            {props.children}
        </ul>
    );
}

export {NotesList}
  