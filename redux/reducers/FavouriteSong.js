import * as type from '../types';

const initialState = {
    "songs":[],
    "songsArrayId":[]
}

export default function FavouriteSong(state = initialState, action) {
    switch (action.type) {
        case type.SET_FAVOURITE_SONG:
            return {
                ...state,
                songs:action.data.songs,
                songsArrayId:action.data.songsId
            }
        default:
            return state;
    }
}
