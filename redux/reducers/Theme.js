import * as type from '../types';

const initialState = {
    theme:true
}

export default function Theme(state = initialState, action) {
    switch (action.type) {
        case type.SET_THEME:
            return {
                ...state,
                theme: action.data
            }
        default:
            return state;
    }
}
