import React, {useState} from 'react';
import { useStore } from '../hooks/store'

const Game = (props) => {
    const [state, dispatch] = useStore()
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.item.title)
    const [genre, setGenre] = useState(props.item.genre)

    const handleSave = () => {
        const datos = [ {prevGame: props.item}, {newGame: {title: title, genre: genre}}]
        dispatch('EDIT_GAME',datos)
        setEdit(false)
    }

    const handleRemove = () => {
        props.remove(props.item)
        setTitle(props.item.title)
        setGenre(props.item.genre)
    }


    return (
        <div key={props.index}> 
            { edit === false ?
                <div key={props.index}> 
                    <p>Titulo: {props.item.title}</p>
                    <p>Género: {props.item.genre}</p>
                    <button onClick={() => setEdit(true)}>Editar</button>
                    <button onClick={() => handleRemove()}>Borrar</button> 
                </div>
            :
                <div key={props.index}> 
                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                    <input value={genre} onChange={(e) => setGenre(e.target.value)}/>
                    <button onClick={() => handleSave()}>Guardar</button> 
                    <button onClick={() => setEdit(false)}>Cancelar</button>
                </div>
            }
        </div>
    );
};

export default Game;