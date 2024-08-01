import * as type from '../types';

const initialState = {
    "isUserLogin":false,
    "fullname":"",
    "email":"",
    "password":"",
}

export default function UserData(state = initialState, action) {
    switch (action.type) {
        case type.SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state;
    }
}
