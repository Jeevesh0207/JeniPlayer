import * as type from '../types'
export function setUserData(data) {
    return {
        type: type.SET_USER_DATA,
        data: data
    }
}