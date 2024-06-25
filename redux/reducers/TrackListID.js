import * as type from '../types';

const initialState = {
    "token":"",
    "type":""
}

export default function TrackListID(state = initialState, action) {
    switch (action.type) {
        case type.SET_TRACK_LIST_ID:
            return {
                ...state,
                token:action.payload.token,
                type:action.payload.type
            }
        default:
            return state;
    }
}
