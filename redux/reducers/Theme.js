import * as type from '../types';

const initialState = {
    theme:true,
    type:""
}

export default function Theme(state = initialState, action) {
    switch (action.type) {
        case type.SET_THEME:
            return {
                ...state,
                theme: action.data.mode,
                type:action.data.type
            }
        default:
            return state;
    }
}
