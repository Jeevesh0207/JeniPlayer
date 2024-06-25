import * as type from '../types';

const initialState = {
    "data": {}
}

export default function UploadData(state = initialState, action) {
    switch (action.type) {
        case type.SET_DATA:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}
