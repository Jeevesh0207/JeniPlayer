import * as type from '../types'
export function setTheme(data) {
    return {
        type: type.SET_THEME,
        data: data
    }
}