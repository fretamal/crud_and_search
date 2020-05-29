import { initStore } from './store';

const configureAuthStore = () => {
  const actions = {
    ADD_BOOK: () => {
        return true
    },
    REMOVE_BOOK: () => {
        return true
    },
    EDIT_BOOK: () => {
        return true
    },
    FILTER_BOOK: () => {
        return true
    },
  };

  initStore(actions, {
    books: null
  });
};

export default configureAuthStore;