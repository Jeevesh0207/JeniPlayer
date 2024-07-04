import * as type from '../types';

const initialState = {
    "activeIndex":0
}

export default function ActiveNav(state = initialState, action) {
    switch (action.type) {
        case type.SET_ACTIVE_NAV:
            return {
                ...state,
                activeIndex: action.data
            }
        default:
            return state;
    }
}
