import * as type from '../types';

const initialState = {
    "data":[]
}

export default function LaunchData(state = initialState, action) {
    switch (action.type) {
        case type.SET_LAUNCH_DATA:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}
