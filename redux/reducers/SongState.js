import * as type from '../types';

const initialState = {
    "isShuffle":false,
    "isRepeat":false
}

export default function SongState(state = initialState, action) {
    switch (action.type) {
        case type.SET_SONG_STATE:
            return {
                ...state,
                isShuffle: action.data.isShuffle,
                isRepeat: action.data.isRepeat,
            }
        default:
            return state;
    }
}
