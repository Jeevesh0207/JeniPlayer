import * as type from '../types'
export function setFavouriteSong(data) {
    return {
        type: type.SET_FAVOURITE_SONG,
        data: data
    }
}