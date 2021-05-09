import {
    SET_ALL_LAUNCHES,
    SET_LATEST_LAUNCH,
    SET_LAUNCH,
    SET_NEXT_LAUNCH,
    SET_PAST_LAUNCHES,
    SET_UPCOMING_LAUNCHES
} from './actionTypes';

const initialState = {
    allLaunches: [],
    launch: {},
    pastLaunches: [],
    upcomingLaunches: [],
    latestLaunch: {},
    nextLaunch: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_LAUNCHES:
            return { ...state, allLaunches: action.payload };
        case SET_LAUNCH:
            return { ...state, launch: action.payload };
        case SET_PAST_LAUNCHES:
            return { ...state, pastLaunches: action.payload };
        case SET_UPCOMING_LAUNCHES:
            return { ...state, upcomingLaunches: action.payload };
        case SET_NEXT_LAUNCH:
            return { ...state, nextLaunch: action.payload };
        case SET_LATEST_LAUNCH:
            return { ...state, latestLaunch: action.payload };
        default:
            return state;
    }
}