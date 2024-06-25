import * as type from '../types';

const initialState = {
    "TrackLists":[],
    "title":"",
    "type":"",
}

export default function VerticalListData(state = initialState, action) {
    switch (action.type) {
        case type.SET_VERTICAL_LIST_DATA:
            return {
                ...state,
                TrackLists: action.payload.data,
                title:action.payload.title,
                type:action.payload.type
            }
        default:
            return state;
    }
}
