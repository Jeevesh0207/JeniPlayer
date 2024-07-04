import * as type from '../types'
export function setActiveNav(data) {
    return {
        type: type.SET_ACTIVE_NAV,
        data: data
    }
}