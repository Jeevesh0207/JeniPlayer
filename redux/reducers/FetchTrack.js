import * as type from '../types';

const initialState = {
    "songs":[]
}

export default function FetchTrack(state = initialState, action) {
    switch (action.type) {
        case type.SET_FETCH_TRACK:
            return {
                ...state,
                songs:action?.data?.songs
            }
        default:
            return state;
    }
}
