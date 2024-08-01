import * as type from '../types'
export function setFetchTrack(data) {
    return {
        type: type.SET_FETCH_TRACK,
        data: data
    }
}