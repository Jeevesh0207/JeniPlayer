import * as type from '../types'
export function setTrackData(data) {
    return {
        type: type.SET_TRACK_PLAYER_DATA,
        data: data
    }
}