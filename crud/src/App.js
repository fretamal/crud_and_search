import React, { useState } from 'react';
import logo from './logo.svg';
import './Custom-bootstrap.scss';
import './App.scss';
import { useStore } from './hooks/store'
import Game from './components/game'

const App = () => {
  const [state, dispatch] = useStore()
  const [titulo, setTitulo] = useState("")
  const [genero, setGenero] = useState("")
  const [busqueda, setBusqueda] = useState("")
  const [juegosFiltrados, setJuegosFiltrados] = useState(null)

  console.log('STATE',state)

  const handleAddGame = () => {
    if(titulo.length>0 && genero.length>0){
        const datos = {title: titulo, genre: genero}
        console.log("DATOS",datos)
        dispatch('ADD_GAME',datos)
        setTitulo("")
        setGenero("")
    }else{
      alert('Los campos no pueden estar vacios')
    }
  }

  const handleRemoveGame = (item) => {
    dispatch('REMOVE_GAME',item)
  }

  const handleFilterGames = (text) => {
    setBusqueda(text)
    if(state.games.length>0 && text.length>0){
      const filtered = state.games.filter( game  => game.title.toLowerCase().indexOf(text.toLowerCase())> -1 || game.genre.toLowerCase().indexOf(text.toLowerCase())> -1)
      setJuegosFiltrados(filtered)
    }
    else if(text.length === 0){
      setJuegosFiltrados(null)
    }
  }

  const showGameList = () => {
    console.log('render list', state.games)
    if(state.games !== null && state.games.length>0 ){
      return(
        state.games.map((item,index) => {
          return(
            <Game remove={(item) => handleRemoveGame(item)} item={item} index={index}/>
          )
        })
      )
    }
  }

  const showFilteredGames = () => {
    if(juegosFiltrados !== null && juegosFiltrados.length>0){
      return(
        juegosFiltrados.map((item,index) => {
          return(
            <Game remove={(item) => handleRemoveGame(item)} item={item} index={index}/>
          )
        })
      )
    }else if(juegosFiltrados.length === 0){
      return <p>No hay juegos encontrados</p>
    }
  }

  return (
    <div className="App">

      <div>
        <div>
            <h1>Mis Juegos Favoritos</h1>
        </div>
        <div>
            <h2>Agregar Juego</h2>
            <label>Título: </label>
            <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>

            <label>Género: </label>
            <input type="text" value={genero} onChange={(e) => setGenero(e.target.value)}/>

            <button onClick={() => handleAddGame()}>Agregar</button>
        </div>
        <div> 
          <div>
            <h2>Lista de jueguitos locos</h2>
            <input type="text" placeholder="Buscar" value={busqueda} onChange={(e) => handleFilterGames(e.target.value)}/>
          </div>

          { juegosFiltrados !== null ? showFilteredGames() : showGameList()}

        </div>
        
      </div>
    </div>
  );
}

export default App;
