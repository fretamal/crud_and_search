import { initStore } from './store';

const configureAuthStore = () => {
  const actions = {
    ADD_GAME: (curState, data) => {
        return {games: [...curState.games, data]}
    },
    REMOVE_GAME: (curState, data) => {
        return {
        ...curState,
        games: curState.games.filter((game) => game !== data)
       };
    },
    EDIT_GAME: (curState, data) => {
        return {
          ...curState,
          games: curState.games.map(game => game === data[0].prevGame ?
              { ...game, title:data[1].newGame.title, genre:data[1].newGame.genre  } : 
              game
          ) 
      }
    },
    FILTER_GAME: () => {
        return true
    },
  };

  initStore(actions, {
    games: [
      {title: 'TLOZ: Ocarina of time', genre:'Aventura'},
      {title: 'Pokemon Red', genre:'RPG'},
    ]
  });
};

export default configureAuthStore;