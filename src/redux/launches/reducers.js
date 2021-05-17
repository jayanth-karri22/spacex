import {
    SET_LAUNCHES_FAILED,
    SET_LAUNCHES_PENDING, SET_LAUNCHES_SUCCESS
} from './actionTypes';

const initialState = {
    launches: [],
    pending: null,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LAUNCHES_SUCCESS:
            return { ...state, launches: action.payload, pending: false };
        case SET_LAUNCHES_FAILED:
            return { ...state, error: action.error, pending: false };
        case SET_LAUNCHES_PENDING:
            return { ...state, pending: true };
        default:
            return state;
    }
}