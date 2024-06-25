import * as type from '../types';

const initialState = {
    img: "",
    loading: false,
    error: null,
}

export default function getImageData(state = initialState, action) {
    switch (action.type) {
        case type.GET_FETCH_REQUESTED:
            return {
                ...state,
                img: "",
                loading: true,
                error: null
            }
        case type.GET_FETCH_SUCCESS:
            return {
                ...state,
                img: action.data,
                loading: false,
                error: null
            }
        case type.GET_FETCH_FAILED:
            return {
                ...state,
                img: "",
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}