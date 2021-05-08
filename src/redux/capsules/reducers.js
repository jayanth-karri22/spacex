import {
    SET_ALL_CAPSULES,
    SET_CAPSULE,
    SET_PAST_CAPSULES,
    SET_UPCOMING_CAPSULES
} from './actionTypes';

const initialState = {
    allCapsules: [],
    capsule: {},
    pastCapsules: [],
    upcomingCapsules: []
}

export default (state = initialState, action) => {
    console.log(action, "REDUCER")
    switch (action.type) {
        case SET_ALL_CAPSULES:
            return { ...state, allCapsules: action.payload };
        case SET_CAPSULE:
            return { ...state, capsule: action.payload };
        case SET_PAST_CAPSULES:
            return { ...state, pastCapsules: action.payload };
        case SET_UPCOMING_CAPSULES:
            return { ...state, upcomingCapsules: action.payload };
        default:
            return state;
    }
}