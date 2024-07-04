import * as type from '../types';

const initialState = {
    "isReady": false,
    "isDisplay": false,
    "queue": [],
    "currentTrack": {},
    "currentTrackIndex": null,
    "songStatus": false,
}

export default function TrackPlayerData(state = initialState, action) {

    switch (action.type) {
        case type.SET_TRACK_PLAYER_DATA:
            return {
                ...state,
                ...action.data
            }
        
        default:
            return state;
    }
}
