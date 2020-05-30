import React, {useState} from 'react';
import { useStore } from '../../hooks/store'
import Swal from 'sweetalert2'

const GameCard = (props) => {
    const [state, dispatch] = useStore()
    const [edit, setEdit] = useState(false)
    const [title, setTitle] = useState(props.item.title)
    const [genre, setGenre] = useState(props.item.genre)

    const handleSave = () => {
        if(title.length > 0 && genre.length > 0){
            setEdit(false)
            const datos = [ {prevGame: props.item}, {newGame: {title: title, genre: genre}}]
            dispatch('EDIT_GAME',datos)
            setTitle(props.item.title)
            setGenre(props.item.genre)
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Ups...',
                text: 'Ninguno de los campos puede estar vacio!',
                confirmButtonColor: '#75919E',
                confirmButtonText: 'Ok'
            })
        }
    }

    const handleRemove = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Los cambios realizados no podrán ser revertidos!",
            icon: 'warning',
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonColor: '#9BC53D',
            cancelButtonColor: '#75919E',
            confirmButtonText: 'Si'
        }).then((result) => {
            if (result.value) {
                dispatch('REMOVE_GAME',props.item)
                setTitle(props.item.title)
                setGenre(props.item.genre)
            }
        })
    }


    return (
        <div className="game-card"> 
            { edit === false ?
               <div className="game-card__content"> 
                    <div className="game-card__titles"> 
                        <p className="game-card__title">Título: {props.item.title}</p>
                        <p className="game-card__genre">Género: {props.item.genre}</p>
                    </div>
                    <div className="game-card__buttons">
                        <button className="button button--edit" onClick={() => setEdit(true)}>Editar</button>
                        <button className="button button--delete" onClick={() => handleRemove()}>Borrar</button>
                    </div>
                </div>
            :
                <div className="game-card__content"> 
                    <div className="game-card__edits">
                        <div className="game-card__form">
                            <p className="game-card__title">Título: </p>
                            <input className="input-form" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </div>
                        <div className="game-card__form">
                            <p className="game-card__genre">Género: </p>
                            <input  className="input-form" value={genre} onChange={(e) => setGenre(e.target.value)}/>
                        </div>
                    </div>
                    <div className="game-card__buttons">
                        <button className="button button--save" onClick={() => handleSave()}>Guardar</button> 
                        <button className="button button--cancel" onClick={() => setEdit(false)}>Cancelar</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default GameCard;