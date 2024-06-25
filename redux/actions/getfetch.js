import * as type from '../types'
export function getImage(formData) {
    return {
        type: type.GET_FETCH_REQUESTED,
        formData:formData
    }
}