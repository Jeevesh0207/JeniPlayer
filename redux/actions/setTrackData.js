import * as type from '../types'
export function setTrackData(data, action) {
    if (action === 'status') {
        return {
            type: type.SET_TRACK_STATUS,
            data: data
        }
    }
    else if (action === 'display') {
        return {
            type: type.SET_TRACK_DISPLAY,
            data: data
        }
    }
    else if (action === 'addTrack') {
        return {
            type: type.SET_TRACK_QUEUE_AND_CURRENT,
            data: data
        }
    }
    else if (action === 'addTrackIndex') {
        return {
            type: type.SET_TRACK_INDEX,
            data: data
        }
    }
    else if (action === "setTrackPlayStatus") {
        return {
            type: type.SET_TRACK_PLAY_STATUS,
            data: data
        }
    }
}