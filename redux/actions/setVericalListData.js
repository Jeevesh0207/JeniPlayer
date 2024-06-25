import * as type from '../types'
export function setVerticalListData(payload) {
    return {
        type: type.SET_VERTICAL_LIST_DATA,
        payload:payload,
    }
}