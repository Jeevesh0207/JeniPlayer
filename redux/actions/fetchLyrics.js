import * as type from '../types'
export function fetchLyrics(data, action = "") {
    if (action === "setLyrics") {
        return {
            type: type.SET_LYRICS,
            data: data
        }
    } else {
        return {
            type: type.FETCH_LYRICS,
            data: data
        }
    }
}