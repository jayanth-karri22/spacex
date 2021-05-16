import {
    SET_LATEST_LAUNCH,
    SET_LAUNCH, SET_LAUNCHES,


    SET_NEXT_LAUNCH
} from './actionTypes';

const initialState = {
    launches: [],
    launch: {},
    latestLaunch: {},
    nextLaunch: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LAUNCHES:
            return { ...state, launches: action.payload };
        case SET_LAUNCH:
            return { ...state, launch: action.payload };
        case SET_NEXT_LAUNCH:
            return { ...state, nextLaunch: action.payload };
        case SET_LATEST_LAUNCH:
            return { ...state, latestLaunch: action.payload };
        default:
            return state;
    }
}