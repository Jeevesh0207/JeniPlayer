import * as type from '../types'
export function setSongState(data) {
    return {
        type: type.SET_SONG_STATE,
        data: data
    }
}