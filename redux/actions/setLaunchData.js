import * as type from '../types'
export function setLaunchData(data) {
    return {
        type: type.SET_LAUNCH_DATA,
        data: data
    }
}