import { ADD_PET, REMOVE_PET, UPDATE_PET, TOGGLE_MODE, EDIT_MODE } from './types.js'

export const addPet = pet => ({
    type: ADD_PET, payload: pet
});

export const removePet = id => ({
    type: REMOVE_PET, payload: id
});

export const updatePet = pet => ({
    type: UPDATE_PET, payload: pet
});

export const toggleMode = mode => ({
    type: TOGGLE_MODE, payload: mode
});

export const editMode = (mode, key) => ({
    type: EDIT_MODE, mode, key
});