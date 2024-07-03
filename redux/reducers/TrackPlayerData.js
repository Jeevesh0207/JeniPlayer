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
        case type.SET_TRACK_STATUS:
            return {
                ...state,
                isReady: action.data
            }
        case type.SET_TRACK_DISPLAY:
            return {
                ...state,
                isDisplay: action.data
            }
        case type.SET_TRACK_QUEUE_AND_CURRENT:
            return {
                ...state,
                queue: action.data.queue,
                currentTrack: action.data.currentTrack,
                currentTrackIndex: action.data.index
            }
        case type.SET_TRACK_INDEX:
            return {
                ...state,
                currentTrackIndex: action.data
            }
        case type.SET_TRACK_PLAY_STATUS:
            return {
                ...state,
                songStatus: action.data
            }
        default:
            return state;
    }
}
