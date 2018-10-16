import { ADD_PET, REMOVE_PET, UPDATE_PET, TOGGLE_MODE, EDIT_MODE } from '../actions/types.js'

const initialState = {
    mode: '',
    editId: 0,
    pets: {},
    id: 1
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MODE: 
            return {...state, mode: action.payload };
        case EDIT_MODE: 
            return {
                ...state,
                mode: action.mode,
                editId: action.key
            }
        case ADD_PET:
            return { 
                ...state, 
                pets: Object.assign({}, state.pets, action.payload), 
                id: state.id + 1 
            };
        case REMOVE_PET:
            return { 
                ...state, 
                pets: Object.assign({}, state.pets, delete state.pets[action.payload]),
                mode: ''
            };
        case UPDATE_PET:
            return {
                ...state,
                pets: Object.assign({}, state.pets, action.payload)
            }
        default:
            return state;
    }
};

export default rootReducer;