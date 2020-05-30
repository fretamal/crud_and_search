import React, {useState} from 'react';
import { useStore } from '../../hooks/store'
import GameCard from '../game-card/game-card'

const GameSection = () => {
    const [state, dispatch] = useStore()
    const [busqueda, setBusqueda] = useState("")
    const [juegosFiltrados, setJuegosFiltrados] = useState(null)

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
        if(state.games !== null && state.games.length>0 ){
          return(
            state.games.map((item,index) => {
              return(
                <GameCard item={item} key={index}/>
              )
            })
          )
        }else if(state.games.length === 0){
          return <p>No hay juegos para mostrar</p>
        }
      }
    
      const showFilteredGames = () => {
        if(juegosFiltrados !== null && juegosFiltrados.length>0){
          return(
            juegosFiltrados.map((item,index) => {
              return(
                <GameCard item={item} key={index}/>
              )
            })
          )
        }else if(juegosFiltrados.length === 0){
          return <p>No hay juegos encontrados</p>
        }
      }

    return (
        <div className="game-section"> 
        <div className="game-section__header">
          <h2>Lista de juegos</h2>
          <input className="input-form" type="text" placeholder="Buscar" value={busqueda} onChange={(e) => handleFilterGames(e.target.value)}/>
        </div>
        <div className="game-section__list">
          { juegosFiltrados !== null ? showFilteredGames() : showGameList()}
        </div>

      </div>
    );
};

export default GameSection;