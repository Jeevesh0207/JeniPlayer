import * as type from '../types'
export function setTrackListID(payload) {
    return {
        type: type.SET_TRACK_LIST_ID,
        payload:payload,
    }
}