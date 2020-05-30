import React, { useState } from 'react';
import Swal from 'sweetalert2' 
import { useStore } from '../../hooks/store'

const Add = () => {
    const [state, dispatch] = useStore()
    const [titulo, setTitulo] = useState("")
    const [genero, setGenero] = useState("")

    const handleAddGame = () => {
        if(titulo.length>0 && genero.length>0){
            const existe = state.games.filter(game => game.title.toLowerCase() === titulo.toLowerCase())
            if(existe.length === 0){
                const datos = {title: titulo, genre: genero}
                console.log("DATOS",datos)
                dispatch('ADD_GAME',datos)
                setTitulo("")
                setGenero("")
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Ups...',
                    text: 'El juego que intentas agregar ya existe!',
                    confirmButtonColor: '#75919E',
                    confirmButtonText: 'Ok'
                })
            }
        }else{
          Swal.fire({
              icon: 'error',
              title: 'Ups...',
              text: 'Los campos Título y Género no pueden estar vacios!',
              confirmButtonColor: '#75919E',
              confirmButtonText: 'Ok'
          })
        }
    }

    return (
        <div className="add-card">
            <h2>Agregar juego</h2>

            <label className="add-card__label">Título: </label>
            <input className="input-form inp" type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

            <label className="add-card__label">Género: </label>
            <input className="input-form" type="text" value={genero} onChange={(e) => setGenero(e.target.value)}/>

            <button className="button button--add" onClick={() => handleAddGame()}>Agregar</button>
        </div>
    );
};

export default Add;