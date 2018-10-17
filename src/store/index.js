import { createStore } from 'redux';
import rootReducer from '../reducers/index.js';
import { loadState, saveState } from '../sessionStorage.js';
import throttle from 'lodash.throttle';

const presistedState = loadState();
const store = createStore(rootReducer, presistedState);

store.subscribe(throttle(() => {
        saveState({
            pets: store.getState().pets,
            id: store.getState().id,
            mode: store.getState().mode,
            editId: store.getState().editId
        });
    }, 1000));

export default store;