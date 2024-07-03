import * as type from '../types';

const initialState = {
    "data": {},
    "loading": false,
    "error": null
}

export default function LyricsData(state = initialState, action) {
    switch (action.type) {
        case type.FETCH_LYRICS:
            return {
                ...state,
                data: {},
                loading: true,
                error: null
            }
        case type.FETCH_LYRICS_SUCCESS || type.SET_LYRICS:
            return {
                ...state,
                data: action.data,
                loading: false,
                error: null
            }
        case type.FETCH_LYRICS_FAILED:
            return {
                ...state,
                data: {},
                loading: false,
                error: action.message
            }
        default:
            return state;
    }
}
